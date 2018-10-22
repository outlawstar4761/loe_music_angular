import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from 'ngx-soundmanager2';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {

  mute:boolean;
  currentPlaying:any;
  currentTrackPostion:number;
  currentTrackDuration:number;
  currentTrackProgress:number;
  volume:number;
  recentAlbums:Album[];

  //subscriptions
  private _musicPlayerMuteSubscription: any;
  private _musicPlayerTrackIdSubscription:any;
  private _musicPlayerVolumeSubscription:any;

  constructor(private _musicPlayerService:MusicPlayerService,private ApiService:ApiService) {
  }

  ngOnInit() {
    // Subscribe for mute changes to update bindings
    this.mute = this._musicPlayerService.getMuteStatus();
    this._musicPlayerMuteSubscription = this._musicPlayerService.musicPlayerMuteEventEmitter
    .subscribe((event:any)=>{
      this.mute = event.data;
    });

    //Subscribe for track changes
    this.currentPlaying = this._musicPlayerService.currentTrackData();
    this._musicPlayerTrackIdSubscription = this._musicPlayerService.musicPlayerTrackEventEmitter
    .subscribe((event:any)=>{
      this.currentPlaying = this._musicPlayerService.currentTrackData();
      this.currentTrackPostion = event.data.trackPosition;
      this.currentTrackDuration = event.data.trackDuration;
      this.currentTrackProgress = event.data.trackProgress;
    });

    //Subscribe for volume changes
    this.volume = this._musicPlayerService.getVolume();
    this._musicPlayerVolumeSubscription = this._musicPlayerService.musicPlayerVolumeEventEmitter
    .subscribe((event:any)=>{
      this.volume = event.data;
    });
  }
  get progress():string{
    return this.currentTrackProgress ? (this.currentTrackProgress.toString() + '%') : '0%';
  }
  get playlist():any{
    return this._musicPlayerService.getPlaylist();
  }

}
