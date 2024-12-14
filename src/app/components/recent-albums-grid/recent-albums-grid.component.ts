import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-recent-albums-grid',
  templateUrl: './recent-albums-grid.component.html',
  styleUrls: ['./recent-albums-grid.component.css']
})
export class RecentAlbumsGridComponent implements OnInit {
  recentAlbums:Album[] = [];
  loading:boolean = false;

  constructor(private ApiService:ApiService) {
    this.loading = true;
    this.ApiService.albums.subscribe((albums)=>{
      this.recentAlbums = [];
      this.recentAlbums = albums;
    });
    this.ApiService.getRecent(300).subscribe((songs)=>{
      this.ApiService.buildAlbums(songs);
      this.loading = false;
    });
  }
  addFiveRandomSongs(){
    let songs = this.recentAlbums.map(e => e.songs).flat();
    let selectedSongs = [];
    for(let i = 0; i < 5; i++){
      selectedSongs.push(songs[Math.floor(Math.random() * (songs.length - 1))]);
    }
    return selectedSongs;
  }

  ngOnInit() {
  }

}
