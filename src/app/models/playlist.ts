export class Playlist {
  UID:number;
  UserId:number;
  Label:string;
  SongIds:string[];
  created_date:string;

  constructor(obj?: any){
    this.UID = obj && obj.UID || null;
    this.UserId = obj && obj.UID || null;
    this.Label = obj && obj.Label || null;
    this.created_date = obj && obj.created_date || null;
    this.SongIds = obj && obj.SongIds || [];
  }
}
