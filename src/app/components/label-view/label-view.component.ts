import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-label-view',
  templateUrl: './label-view.component.html',
  styleUrls: ['./label-view.component.css']
})
export class LabelViewComponent implements OnInit {
  albums:Album[];
  value:string;

  constructor(private route: ActivatedRoute,private ApiService:ApiService){
    this.ApiService.albums.subscribe(albums=>{
      this.albums = albums;
    });
    route.params.subscribe(params=>{
      this.value = params['publisher'];
      this.ApiService.search('publisher',this.value).subscribe((songs)=>{
        let labels = this.ApiService.parseAlbums(songs);
        this.ApiService.buildAlbums(labels);
      });
    });
  }

  ngOnInit() {
  }

}
