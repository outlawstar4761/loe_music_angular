import { Component, OnInit, Inject } from '@angular/core';
import { SoundManagerSong } from '../../models/sound-manager-song';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

export interface RatingData{
  song:SoundManagerSong;
}
interface IRating{
  rating:number;
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})

export class RatingComponent implements OnInit {
  rating:number = 0;

  constructor(public dialogRef:MatDialogRef<RatingComponent>,@Inject(MAT_DIALOG_DATA) public data: RatingData,private ApiService:ApiService) { }

  ngOnInit() {
  }
  onStarClick(event:IRating):void{
    this.rating = event.rating;
  }
  onClose():void{
    console.log(this.data.song.id + ": " + this.rating);
    this.dialogRef.close();
    this.ApiService.rateSong(this.data.song.id,this.rating).subscribe(console.log);
  }

}
