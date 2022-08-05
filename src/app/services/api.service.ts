import { Injectable,Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable,Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import{
  HttpClient,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';

import { Song } from '../models/song';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint:string;
  domain:string;
  authEndPoint:string;
  authToken:string;
  regexPattern:RegExp;
  tmpAlbums:Album[];
  albums:Subject<Album[]> = new BehaviorSubject<Album[]>([]);

  constructor(
    @Inject('API_ENDPOINT') ENDPOINT:string,
    @Inject('LOE_DOMAIN') DOMAIN:string,
    @Inject('AUTH_ENDPOINT') AUTH:string,
    private http:HttpClient,
    private cookie:CookieService,
    private router:Router) {
    this.endpoint = ENDPOINT;
    this.domain = DOMAIN;
    this.authEndPoint = AUTH;
    this.regexPattern = /\/LOE\//;
  }
  _buildAuthHeader():HttpHeaders{
    return new HttpHeaders({'auth_token':this.authToken});
  }
  authenticate(username:string,password:string):Observable<any>{
    let headers = new HttpHeaders({'request_token':username,'password':password});
    let url = this.authEndPoint + 'authenticate';
    return this.http.get(url,{headers:headers}).pipe(map(response=>{return response}));
  }
  login(username:string,password:string):void{
    this.authenticate(username,password).subscribe((response)=>{
      if(!response['error']){
        this.authToken = response.token;
        //for prod, change to outlawdesigns.io && true
        this.cookie.set('auth_token',this.authToken,200,'/','localhost',false,'Strict');
        this.checkCookie();
      }else{
        this.router.navigateByUrl('/login');
      }
    });
  }
  verifyToken():Observable<any>{
    let url = this.authEndPoint + '/verify';
    return this.http.get<any>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{return response}));
  }
  checkCookie():void{
    console.log('checking cookie...');
    if(this.cookie.check('auth_token')){
      this.authToken = this.cookie.get('auth_token');
      this.verifyToken().subscribe((response)=>{
        if(!response['error']){
          this.router.navigateByUrl('/recent');
        }else{
          this.router.navigateByUrl('/login');
        }
      },console.log);
    }
  }
  search(field:string,query:string):Observable<Song[]>{
    let url = this.endpoint + 'search/' + field + '/' + query;
    return this.http.get<Song[]>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{
      return response.map((song)=>{
        song.file_path = song.file_path.replace(this.regexPattern,this.domain);
        song.cover_path = song.cover_path.replace(this.regexPattern,this.domain);
        song.url = song.file_path;
        return new Song(song);
      })
    }));
  }
  browse(field:string):Observable<string[]>{
    let url = this.endpoint + 'browse/' + field;
    return this.http.get<string[]>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{return response}));
  }
  getRecent(limit:number):Observable<Song[]>{
    let url = this.endpoint + 'recent/' + limit;
    return this.http.get<Song[]>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{return response.map((song)=>{return new Song(song)})}));
  }
  getRandomPlayList(genre:string,limit:number){
    let url = this.endpoint + 'random/' + genre + '/' + limit;
    return this.http.get<Song[]>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{return response.map((song)=>{
      song.file_path = song.file_path.replace(this.regexPattern,this.domain);
      song.cover_path = song.cover_path.replace(this.regexPattern,this.domain);
      song.url = song.file_path;
      return new Song(song);
    })}));
  }
  parseAlbums(songs:Song[]){
    return songs.map((s)=>{return s.album}).filter((v,i,self)=>{return self.indexOf(v) == i})
  }
  buildAlbums(albums:string[]):void{
    this.tmpAlbums = [];
    albums.forEach((album)=>{
      this.search('album',album).subscribe((songs)=>{
        let tmpAlbums = this.groupAlbums(songs);
        for(let key in tmpAlbums){
          let newAlbum = new Album(
            {
              title:tmpAlbums[key][0].album,
              year:tmpAlbums[key][0].year,
              genres:this.parseGenres(tmpAlbums[key][0].genre),
              artist:tmpAlbums[key][0].artist,
              cover_path:tmpAlbums[key][0].cover_path,
              songs:tmpAlbums[key].sort((a,b)=>{return a.track_number - b.track_number})
            }
          );
          this.tmpAlbums.push(newAlbum);
        }
      });
      this.albums.next(this.tmpAlbums);
    });
  }
  rateSong(songId:number,rating:number):Observable<any>{
    let url = this.endpoint + 'rate/' + songId;
    return this.http.post(url,{rating:rating},{headers:this._buildAuthHeader()}).pipe(map(response=>{return response}));
  }
  savePlaylist(playlist){
    let url = this.endpoint + 'list/';
    return this.http.post(url,playlist,{headers:this._buildAuthHeader()}).pipe(map(response=>{return response}));
  }
  groupAlbums(songs){
    return songs.reduce((accumulator,song)=>{
      if(!accumulator[song['album'] + '_' + song['artist'] + '_' + song['year']]) { accumulator[song['album'] + '_' + song['artist'] + '_' + song['year']] = []}
      accumulator[song['album'] + '_' + song['artist'] + '_' + song['year']].push(song);
      return accumulator;
    },{});
  }
  parseGenres(genre){
    let genres = [];
    let pieces = genre.split(';');
    pieces.map((piece)=>{
      let smallPieces = piece.split(',');
      smallPieces.forEach((sp)=>{
        genres.push(sp.replace(/\(.*/,'').trim());
      });
      return smallPieces;
    });
    return genres;
  }
}

/*

genres = [
    'Black Metal (early), Black.Doom Metal (later)',
    'Grindcore, Black Metal (early); Gothic Metal (mid); Melodic Black Metal (later)',
    'Black.Thrash Metal (early), Black Metal (later)',
    'Black.Thrash Metal (early), Black.Industrial Metal (later)',
    'Speed Metal (early), Heavy.Power Metal (later)',
    'Sludge.Doom Metal, Noise',
    'NWOBHM (early), Heavy.Power Metal (later)',
    'Grindcore (early), Brutal Death Metal (later)',
    'Brutal Death Metal (early), Melodic Deathcore (later)',
    'Black Metal (early), Black.Thrash Metal (later)',
    'Folk.Melodic Death Metal, Folk',
    'Black Metal, Dark Ambient',
    'Death Metal (early); Melodic Death Metal (later',
    'Melodic Death.Thrash Metal (early); Melodic Black.Death Metal (later)',
    'Melodic Death Metal (early); Technical.Melodic Death Metal (later)',
    'Thrash Metal (early); Black Metal (later)',
    'Death.Black Metal (early); Folk Black Metal (later)',
    'Black.Death Metal (early); Death Metal (later)'
];

*/
