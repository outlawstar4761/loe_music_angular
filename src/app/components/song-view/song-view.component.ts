import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-view',
  templateUrl: './song-view.component.html',
  styleUrls: ['./song-view.component.css']
})
export class SongViewComponent implements OnInit {
  songs:Song[] = [];
  title:string = '';
  loading:boolean = false;

  constructor(private route: ActivatedRoute,private router:Router,private ApiService:ApiService){
    route.params.subscribe(params=>{
      this.title = params['title'];
      this.loading = true;
      this.ApiService.search('title',this.title).subscribe((songs)=>{
        this.songs = songs;
        this.loading = false;
      });
    });
  }

  ngOnInit() {
  }

}
