import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-country-view',
  templateUrl: './country-view.component.html',
  styleUrls: ['./country-view.component.css']
})
export class CountryViewComponent implements OnInit {
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
      this.value = params['country'];
      this.loading = true;
      this.ApiService.search('artist_country',this.value).subscribe((songs)=>{
        this.ApiService.buildAlbums(songs);
        this.loading = false;
      });
    });
  }

  ngOnInit() {
  }

}
