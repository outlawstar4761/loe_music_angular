import { Injectable,Inject } from '@angular/core';
import { Observable,Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import{
  HttpClient,
  HttpRequest
} from '@angular/common/http';

import { Song } from '../models/song';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint:string;
  domain:string;
  regexPattern:RegExp;
  tmpAlbums:Album[];
  albums:Subject<Album[]> = new BehaviorSubject<Album[]>([]);

  constructor(@Inject('API_ENDPOINT') ENDPOINT:string,@Inject('LOE_DOMAIN') DOMAIN:string,private http:HttpClient) {
    this.endpoint = ENDPOINT;
    this.domain = DOMAIN;
    this.regexPattern = /\/LOE\//;
  }
  search(field:string,query:string):Observable<Song[]>{
    let url = this.endpoint + 'search/' + field + '/' + query;
    return this.http.get<Song[]>(url).pipe(map(response=>{
      return response.map((song)=>{
        song.file_path = song.file_path.replace(this.regexPattern,this.domain);
        song.cover_path = song.cover_path.replace(this.regexPattern,this.domain);
        //song.file_path = this.domain + song.file_path;
        //song.cover_path = this.domain + song.cover_path;
        song.url = song.file_path;
        return new Song(song);
      })
    }));
  }
  browse(field:string):Observable<string[]>{
    let url = this.endpoint + 'browse/' + field;
    return this.http.get<string[]>(url).pipe(map(response=>{return response}));
  }
  getRecent(limit:number):Observable<Song[]>{
    let url = this.endpoint + 'recent/' + limit;
    return this.http.get<Song[]>(url).pipe(map(response=>{return response.map((song)=>{return new Song(song)})}));
  }
  parseAlbums(songs:Song[]){
    let albumLabels = [];
    songs.forEach((song)=>{
      if(albumLabels.indexOf(song.album) === -1){
        albumLabels.push(song.album);
      }
    });
    return albumLabels;
  }
  buildAlbums(albums:string[]):void{
    this.tmpAlbums = [];
    albums.forEach((album)=>{
      let newAlbum = new Album({title:album});
      this.search('album',album).subscribe((songs)=>{
        songs.forEach((song)=>{
          if(song.album === album){
            newAlbum.songs.push(song);
            newAlbum.year = song.year;
            newAlbum.genre = song.genre;
            newAlbum.artist = song.artist;
            newAlbum.cover_path = song.cover_path;
          }
        });
        this.tmpAlbums.push(newAlbum);
      });
      this.albums.next(this.tmpAlbums);
    });
  }
}
/*
let newAlbum = {
  title:album,
  songs:songs,
  year:songs[0].year,
  artist:songs[0].artist,
  cover_path:songs[0].cover_path
};
newAlbums.push(new Album(newAlbum));

*/
