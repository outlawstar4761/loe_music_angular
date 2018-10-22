import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-artist-grid',
  templateUrl: './artist-grid.component.html',
  styleUrls: ['./artist-grid.component.css']
})
export class ArtistGridComponent implements OnInit {
  albums:Album[];
  artist:string;

  constructor(private route: ActivatedRoute,private ApiService:ApiService){
    this.ApiService.albums.subscribe(albums=>{
      this.albums = albums;
    });
    route.params.subscribe(params=>{
      this.artist = params['artist'];
      this.ApiService.search('artist',this.artist).subscribe((songs)=>{
        let labels = this.ApiService.parseAlbums(songs);
        this.ApiService.buildAlbums(labels);
      });
    });
  }

  ngOnInit() {
  }

}
