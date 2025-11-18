import { Injectable,Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable,Subject, BehaviorSubject } from 'rxjs';
import { from, map } from 'rxjs';
import { Router } from '@angular/router';
import { isDevMode } from '@angular/core';
import{
  HttpClient,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import loeClient from '@outlawdesigns/loe-rest-client';
import { Song } from '../models/song';
import { Album } from '../models/album';
import { Playlist } from '../models/playlist';

console.log(typeof loeClient);

interface TmpAlbum {
  [key:string]: any
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  isInitialized:boolean = false;
  apiUrl:string;
  authDiscoveryUri:string;
  authClientId:string;
  authRedirectUrl:string;
  authLogoutUrl:string;
  authScope:string;
  regexPattern:RegExp;
  tmpAlbums:Album[] = [];
  albums:Subject<Album[]> = new BehaviorSubject<Album[]>([]);
  domain:string;

  constructor(
    @Inject('AUTH_DISCOVERY_URI') AUTH_DISCOVERY_URI:string,
    @Inject('AUTH_CLIENT_ID') AUTH_CLIENT_ID:string,
    @Inject('AUTH_REDIRECT_URL') AUTH_REDIRECT_URL:string,
    @Inject('AUTH_LOGOUT_URL') AUTH_LOGOUT_URL:string,
    @Inject('AUTH_SCOPE') AUTH_SCOPE:string,
    @Inject('API_ENDPOINT') API_ENDPOINT:string,
    @Inject('LOE_DOMAIN') LOE_DOMAIN:string,
    private http:HttpClient,
    private cookie:CookieService,
    private router:Router) {
      this.regexPattern = /\/LOE\//;
      this.authDiscoveryUri = AUTH_DISCOVERY_URI;
      this.authClientId = AUTH_CLIENT_ID;
      this.authRedirectUrl = AUTH_REDIRECT_URL;
      this.authLogoutUrl = AUTH_LOGOUT_URL;
      this.authScope = AUTH_SCOPE;
      this.apiUrl = API_ENDPOINT;
      this.domain = LOE_DOMAIN;
      // this.isInitialized = false;
  }
  async ensureInitialized():Promise<void>{
    if (this.isInitialized) return;
    await this.initApiClient();
    this.isInitialized = true;
  }
  initApiClient():Promise<void>{
    return new Promise(async (resolve, reject)=>{
      try{
        loeClient.init(this.apiUrl, this.authScope);
        await loeClient.get().auth.init(this.authDiscoveryUri,this.authClientId);
        // this.isInitialized = true;
        resolve();
      }catch(err){
        console.error(err);
        reject(err);
      }
    });
  }
  async verifyToken():Promise<void>{
    if(!this.cookie.check('oathTokenSet')){
      const challengeResults = await loeClient.get().auth.authorizationCodeFlow(this.authRedirectUrl,this.authScope,[this.apiUrl]);
      const verifier = challengeResults.codeVerifier;
      const state = challengeResults.state;
      sessionStorage.setItem('oauth_state',state);
      sessionStorage.setItem('oauth_code_verifier',verifier);
      window.location.href = challengeResults.redirectUri;
      return;
    }
    try{
      const tokenSet = JSON.parse(this.cookie.get('oathTokenSet'));
      const user = await loeClient.get().auth.verifyAccessToken(tokenSet.access_token,[this.apiUrl]);
      this.router.navigateByUrl('/recent');
    }catch(err){
      console.error(err);
      //if something, authorizationCodeFlow()..
    }
  }
  async swapAuthorizationToken(authorizationCode:string):Promise<void>{
    const state = sessionStorage.getItem('oauth_state');
    const verifier = sessionStorage.getItem('oauth_code_verifier');
    let url = new URL(window.location.href);
    if(!url.pathname.endsWith('/')){
      url.pathname += '/';
    }
    await loeClient.get().auth.completeAuthFlow(url,state,verifier);
    const tokenSet = loeClient.get().auth.getTokenSet();
    this.cookie.set('oathTokenSet',JSON.stringify(tokenSet));
    //console.log(tokenSet);
    this.router.navigateByUrl('/recent');
  }
  getSong(UID:number):Observable<Song>{
    return from(loeClient.get().songs.get(UID)).pipe(map( res => new Song(res)));
  }
  search(field:string,query:string):Observable<Song[]>{
    return from(loeClient.get().songs.search(field,query) as Promise<any[]>).pipe(map((data: any[])=>{
      return data.map(song => {
        song.file_path = song.file_path.replace(this.regexPattern,this.domain);
        song.cover_path = song.cover_path.replace(this.regexPattern,this.domain);
        song.url = song.file_path
        return new Song(song);
      });
    }));
  }
  browse(field:string):Observable<string[]>{
    return from(loeClient.get().songs.browse(field) as Promise<string[]>).pipe(map((data: string[])=>{
      return data;
    }));
  }
  getRecent(limit:number):Observable<Song[]>{
    return from(loeClient.get().songs.getRecent(limit) as Promise<any[]>).pipe(map((data: any[])=>{
      return data.map(song => {
        song.file_path = song.file_path.replace(this.regexPattern,this.domain);
        song.cover_path = song.cover_path.replace(this.regexPattern,this.domain);
        song.url = song.file_path
        return new Song(song);
      });
    }));
  }
  getRandomPlayList(genre:string,limit:number){
    return from(loeClient.get().songs.getRandomPlaylist(genre,limit) as Promise<any[]>).pipe(map((data: any[])=>{
      return data.map(song => {
        song.file_path = song.file_path.replace(this.regexPattern,this.domain);
        song.cover_path = song.cover_path.replace(this.regexPattern,this.domain);
        song.url = song.file_path
        return new Song(song);
      });
    }));
  }
  getMyPlaylists(){
    return from(loeClient.get().songs.getMyPlaylists() as Promise<any[]>).pipe(map((data: any[])=>{
      return data.map(playlist => {
        return new Playlist(playlist);
      });
    }));
  }
  rateSong(songId:number,rating:number):Observable<any>{
    return from(loeClient.get().songs.rate(songId,rating)).pipe(map( res => res));
  }
  savePlaylist(playlist:object){
    return from(loeClient.get().songs.savePlaylist(playlist)).pipe(map( res => res));
  }
  parseAlbums(songs:Song[]){
    return songs.map((s)=>{return s.album}).filter((v,i,self)=>{return self.indexOf(v) == i})
  }
  buildAlbumsFromLabels(albums:string[]):void{
    this.tmpAlbums = [];
    albums.forEach((album)=>{
      this.search('album',album).subscribe((songs)=>{
        let tmpAlbums:TmpAlbum = this.groupAlbums(songs);
        let key:keyof typeof tmpAlbums;
        for(let key in tmpAlbums){
          let tmpAlbum:Song[] = tmpAlbums[key];
          let newAlbum = new Album(
            {
              title:tmpAlbum[0].album,
              year:tmpAlbum[0].year,
              genres:this.parseGenres(tmpAlbum[0].genre),
              artist:tmpAlbum[0].artist,
              cover_path:tmpAlbum[0].cover_path,
              songs:tmpAlbum.sort((a:Song,b:Song)=>{return a.track_number - b.track_number})
            }
          );
          this.tmpAlbums.push(newAlbum);
        }
      });
      this.albums.next(this.tmpAlbums);
    });
  }
  buildAlbums(songs:Song[]):void{
    this.tmpAlbums = [];
    let tmpAlbums:TmpAlbum = this.groupAlbums(songs);
    let key:keyof typeof tmpAlbums;
    for(let key in tmpAlbums){
      let tmpAlbum:Song[] = tmpAlbums[key];
      let newAlbum = new Album(
        {
          title:tmpAlbum[0].album,
          year:tmpAlbum[0].year,
          genres:this.parseGenres(tmpAlbum[0].genre),
          artist:tmpAlbum[0].artist,
          cover_path:tmpAlbum[0].cover_path,
          songs:tmpAlbum.sort((a:Song,b:Song)=>{return a.track_number - b.track_number})
        }
      );
      this.tmpAlbums.push(newAlbum);
    }
    this.albums.next(this.tmpAlbums);
  }
  groupAlbums(songs:Song[]){
    return songs.reduce((accumulator:TmpAlbum,song)=>{
      if(!accumulator[song['album'] + '_' + song['artist'] + '_' + song['year']]) { accumulator[song['album'] + '_' + song['artist'] + '_' + song['year']] = []}
      accumulator[song['album'] + '_' + song['artist'] + '_' + song['year']].push(song);
      return accumulator;
    },{});
  }
  parseGenres(genre:string) : string[]{
    if(!genre) return [];
    let genres: string[] = [];
    let pieces: string[] = genre.split(';');
    pieces.map((piece)=>{
      let smallPieces: string[] = piece.split(',');
      smallPieces.forEach((sp)=>{
        genres.push(sp.replace(/\(.*/,'').trim());
      });
      return smallPieces;
    });
    return genres;
  }
}
