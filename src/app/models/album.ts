import { Song } from './song';
export class Album {
  title:string;
  artist:string;
  cover_path:string;
  year:number;
  songs:Song[];

  constructor(obj?: any){
    this.title = obj && obj.title || null;
    this.artist = obj && obj.artist || null;
    this.cover_path = obj && obj.cover_path || null;
    this.year = obj && obj.year || null;
    this.songs = obj && obj.songs || [];
  }
}
