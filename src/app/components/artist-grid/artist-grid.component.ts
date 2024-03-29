import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-artist-grid',
  templateUrl: './artist-grid.component.html',
  styleUrls: ['./artist-grid.component.css']
})
export class ArtistGridComponent implements OnInit {
  albums:Album[] = [];
  artist:string = '';
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
      this.artist = params['artist'];
      this.loading = true;
      this.ApiService.search('artist',this.artist).subscribe((songs)=>{
        this.ApiService.buildAlbums(songs);
        this.loading = false;
      });
    });
  }

  ngOnInit() {
  }

}
