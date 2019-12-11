import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-country-view',
  templateUrl: './country-view.component.html',
  styleUrls: ['./country-view.component.css']
})
export class CountryViewComponent implements OnInit {
  albums:Album[];
  value:string;

  constructor(private route: ActivatedRoute,private ApiService:ApiService){
    this.ApiService.albums.subscribe(albums=>{
      this.albums = albums;
    });
    route.params.subscribe(params=>{
      this.value = params['year'];
      this.ApiService.search('year',this.value).subscribe((songs)=>{
        let labels = this.ApiService.parseAlbums(songs);
        this.ApiService.buildAlbums(labels);
      });
    });
  }

  ngOnInit() {
  }

}
