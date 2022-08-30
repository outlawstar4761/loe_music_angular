export class Song {
  UID:number;
  title:string;
  artist:string;
  album:string;
  year:number;
  track_number:number;
  genre:string;
  band:string;
  length:string;
  publisher:string;
  bpm:string;
  feat:string;
  file_path:string;
  cover_path:string;
  created_date:Date;
  play_count:number;
  last_play:Date;
  artist_country:string;
  id:number;
  url:string;

  constructor(obj?: any){
    this.UID = obj && obj.UID || null;
    this.title = obj && obj.title || null;
    this.artist = obj && obj.artist || null;
    this.album = obj && obj.album || null;
    this.year = obj && obj.year || null;
    this.track_number = obj && obj.track_number || null;
    this.genre = obj && obj.genre || null;
    this.band = obj && obj.band || null;
    this.length = obj && obj.length || null;
    this.publisher = obj && obj.publisher || null;
    this.bpm = obj && obj.bpm || null;
    this.feat = obj && obj.feat || null;
    this.file_path = obj && obj.file_path || null;
    this.cover_path = obj && obj.cover_path || null;
    this.created_date = obj && new Date(obj.created_date) || null;
    this.play_count = obj && obj.play_count || null;
    this.last_play = obj && new Date(obj.last_play) || null;
    this.artist_country = obj && obj.artist_country || null;
    this.id = obj && obj.UID || null;
    this.url = obj && obj.file_path || null;
  }
}
