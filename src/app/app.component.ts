import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MusicPlayerService } from 'ngx-soundmanager2';
import { ApiService } from './services/api.service';
// import { Album } from './models/album';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _musicPlayerTrackIdSubscription:any;
  currentPlaying:any = null;

  constructor(private _titleService:Title, private _musicPlayerService:MusicPlayerService, private ApiService:ApiService){
    this.currentPlaying = this._musicPlayerService.currentTrackData();
    this._musicPlayerTrackIdSubscription = this._musicPlayerService.musicPlayerTrackEventEmitter
    .subscribe((event:any)=>{
      this.currentPlaying = this._musicPlayerService.currentTrackData();
      if(this.currentPlaying){
        this._titleService.setTitle(this.currentPlaying.title + ' | ' + this.currentPlaying.artist + ', ' + this.currentPlaying.album + ' (' + this.currentPlaying.year + ')');
      }else{
        this._titleService.setTitle('LOE Music');
      }
    });
  }
}
