import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-recent-albums-grid',
  templateUrl: './recent-albums-grid.component.html',
  styleUrls: ['./recent-albums-grid.component.css']
})
export class RecentAlbumsGridComponent implements OnInit {
  recentAlbums:Album[];

  constructor(private ApiService:ApiService) {
    this.ApiService.albums.subscribe((albums)=>{
      this.recentAlbums = [];
      this.recentAlbums = albums;
    });
    this.ApiService.getRecent(300).subscribe((songs)=>{
      let labels = this.ApiService.parseAlbums(songs);
      this.ApiService.buildAlbums(labels);
    });
  }

  ngOnInit() {
  }

}
