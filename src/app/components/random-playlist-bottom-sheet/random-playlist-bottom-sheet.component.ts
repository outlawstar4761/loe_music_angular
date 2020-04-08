import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { MusicPlayerService } from 'ngx-soundmanager2';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-random-playlist-bottom-sheet',
  templateUrl: './random-playlist-bottom-sheet.component.html',
  styleUrls: ['./random-playlist-bottom-sheet.component.css']
})
export class RandomPlaylistBottomSheetComponent implements OnInit {
  genreOptions:any[];

  constructor(private bottomSheetRef:MatBottomSheetRef<NavbarComponent>,private ApiService:ApiService,private _musicPlayerService:MusicPlayerService) {
    this.ApiService.browse('genre').subscribe((labels)=>{
      this.genreOptions = labels;
      this.genreOptions.sort();
    });
  }

  ngOnInit() {
  }

  onSubmit(value):void{
    this.ApiService.getRandomPlayList(value.genre,value.limit).subscribe((songs)=>{
      songs.forEach((song)=>{
        console.log(song);
        this._musicPlayerService.addTrack(song);
      });
      this.bottomSheetRef.dismiss();
    });
  }

}
