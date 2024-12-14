import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MusicPlayerService } from 'ngx-soundmanager2';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { Playlist } from '../../models/playlist';

interface IQuery{
  playlist:number
}

@Component({
  selector: 'app-my-playlist-bottom-sheet',
  templateUrl: './my-playlist-bottom-sheet.component.html',
  styleUrls: ['./my-playlist-bottom-sheet.component.css']
})
export class MyPlaylistBottomSheetComponent implements OnInit {

  myplaylists:Playlist[] = [];

  constructor(private bottomSheetRef:MatBottomSheetRef<NavbarComponent>,private ApiService:ApiService,private _musicPlayerService:MusicPlayerService) {
    this.ApiService.getMyPlaylists().subscribe((playlists)=>{
      this.myplaylists = playlists
    });
  }

  ngOnInit(): void {
  }
  onSubmit(form:IQuery):void{
    let playlist = this.myplaylists.filter(e => e.UID = form.playlist)[0];
    playlist.SongIds.forEach((e)=>{
      this.ApiService.getSong(parseInt(e)).subscribe((song)=>{
        this._musicPlayerService.addTrack(song);
      });
    });
    this.bottomSheetRef.dismiss();
  }

}
