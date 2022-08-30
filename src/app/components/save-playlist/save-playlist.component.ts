import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

export interface PlaylistData{
  songIds:number[];
}

@Component({
  selector: 'app-save-playlist',
  templateUrl: './save-playlist.component.html',
  styleUrls: ['./save-playlist.component.css']
})
export class SavePlaylistComponent implements OnInit {
  label:string = '';

  constructor(public dialogRef:MatDialogRef<SavePlaylistComponent>,@Inject(MAT_DIALOG_DATA) public data: PlaylistData,private ApiService:ApiService) { }

  ngOnInit() {
  }

  onClose():void{
    console.log(this.label);
    console.log(this.data.songIds);
    this.dialogRef.close();
    this.ApiService.savePlaylist({label:this.label,songIds:this.data.songIds}).subscribe(console.log);
  }

}
