import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-resultgrid-view',
  templateUrl: './result-grid.component.html',
  styleUrls: ['./result-grid.component.css']
})
export class ResultGridComponent implements OnInit {
  albums:Album[] = [];
  value:string = '';
  key:string = '';
  loading:boolean = false;

  constructor(private route: ActivatedRoute,private router:Router,private ApiService:ApiService){
    this.ApiService.albums.subscribe(albums=>{
      this.albums = albums;
    });
    route.params.subscribe(params=>{
      this.key = params['key']
      this.value = params['value'];
      this.loading = true;
      this.ApiService.search(this.key,this.value).subscribe((songs)=>{
        this.ApiService.buildAlbums(songs);
        this.loading = false;
      });
    });
  }
  addFiveRandomSongs(){
    let songs = this.albums.map(e => e.songs).flat();
    let selectedSongs = [];
    for(let i = 0; i < 5; i++){
      selectedSongs.push(songs[Math.floor(Math.random() * (songs.length - 1))]);
    }
    return selectedSongs;
  }

  ngOnInit() {
  }

}
