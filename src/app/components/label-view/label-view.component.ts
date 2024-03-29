import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-label-view',
  templateUrl: './label-view.component.html',
  styleUrls: ['./label-view.component.css']
})
export class LabelViewComponent implements OnInit {
  albums:Album[] = [];
  value:string = '';
  loading:boolean = false;

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
      this.value = params['label'];
      this.loading = true;
      this.ApiService.search('publisher',this.value).subscribe((songs)=>{
        this.ApiService.buildAlbums(songs);
        this.loading = false;
      });
    });
  }

  ngOnInit() {
  }

}
