import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-view',
  templateUrl: './song-view.component.html',
  styleUrls: ['./song-view.component.css']
})
export class SongViewComponent implements OnInit {
  songs:Song[];
  title:string;

  constructor(private route: ActivatedRoute,private ApiService:ApiService){
    route.params.subscribe(params=>{
      this.title = params['title'];
      console.log(this.title);
      this.ApiService.search('title',this.title).subscribe((songs)=>{
        this.songs = songs;
        console.log(this.songs);
      });
    });
  }

  ngOnInit() {
  }

}
