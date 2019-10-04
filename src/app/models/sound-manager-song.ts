export class SoundManagerSong {
  id:number;
  title:string;
  artist:string;
  url:string;

  constructor(obj?: any){
    this.id = obj && obj.UID || null;
    this.title = obj && obj.title || null;
    this.artist = obj && obj.artist || null;
    this.url = obj && obj.file_path || null;
  }
}
