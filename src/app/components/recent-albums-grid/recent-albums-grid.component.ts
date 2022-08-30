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

  constructor(private ApiService:ApiService) {
    this.ApiService.albums.subscribe((albums)=>{
      this.recentAlbums = [];
      this.recentAlbums = albums;
    });
    this.ApiService.browse('album').subscribe((labels)=>{
      this.ApiService.buildAlbums(labels.slice(labels.length - 31,labels.length - 1));
    });
  }

  ngOnInit() {
  }

}
