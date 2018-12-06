import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-genre-grid',
  templateUrl: './genre-grid.component.html',
  styleUrls: ['./genre-grid.component.css']
})
export class GenreGridComponent implements OnInit {
  albums:Album[];
  genre:string;

  constructor(private route: ActivatedRoute,private ApiService:ApiService){
    this.ApiService.albums.subscribe(albums=>{
      this.albums = albums;
    });
    route.params.subscribe(params=>{
      this.genre = params['genre'];
      this.ApiService.search('genre',this.genre).subscribe((songs)=>{
        let labels = this.ApiService.parseAlbums(songs);
        this.ApiService.buildAlbums(labels);
      });
    });
  }

  ngOnInit() {
  }

}
