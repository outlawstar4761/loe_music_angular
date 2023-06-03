import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
export class AlbumViewComponent implements OnInit {
  albums:Album[] = [];
  title:string = '';
  genres:string[] = ['Black Metal','Death Metal','Thrash Metal'];

  constructor(private route: ActivatedRoute,private router:Router,private ApiService:ApiService){
    this.ApiService.verifyToken().subscribe(result=>{
      if(result['error']){
        this.router.navigateByUrl('/login');
      }
    });
    this.ApiService.albums.subscribe(albums=>{
      this.albums = albums;
    });
    route.params.subscribe(params=>{
      this.title = params['title'];
      this.ApiService.buildAlbumsFromLabels([this.title]);
    });
  }

  ngOnInit() {
  }

}
