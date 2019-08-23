import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Album } from './models/album';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'loe-music';
  recentAlbums:Album[];

  constructor(private ApiService:ApiService){
    this.ApiService.checkCookie();
    this.ApiService.albums.subscribe((albums)=>{
      this.recentAlbums = [];
      this.recentAlbums = albums;
    });
  }
}
