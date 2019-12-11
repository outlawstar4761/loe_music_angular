import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-year-view',
  templateUrl: './year-view.component.html',
  styleUrls: ['./year-view.component.css']
})
export class YearViewComponent implements OnInit {
  albums:Album[];
  year:string;

  constructor(private route: ActivatedRoute,private ApiService:ApiService){
    this.ApiService.albums.subscribe(albums=>{
      this.albums = albums;
    });
    route.params.subscribe(params=>{
      this.year = params['year'];
      this.ApiService.search('year',this.year).subscribe((songs)=>{
        let labels = this.ApiService.parseAlbums(songs);
        this.ApiService.buildAlbums(labels);
      });
    });
  }

  ngOnInit() {
  }

}
