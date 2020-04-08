import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';

import { NgxSoundmanager2Module } from 'ngx-soundmanager2';
import { MaterialModule } from './material.module';
import { NgMarqueeModule } from 'ng-marquee';

import { AppComponent } from './app.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { AlbumViewComponent } from './components/album-view/album-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecentAlbumsGridComponent } from './components/recent-albums-grid/recent-albums-grid.component';
import { ArtistGridComponent } from './components/artist-grid/artist-grid.component';
import { SongViewComponent } from './components/song-view/song-view.component';
import { SearchBottomSheetComponent } from './components/search-bottom-sheet/search-bottom-sheet.component';
import { GenreGridComponent } from './components/genre-grid/genre-grid.component';
import { LoginComponent } from './components/login/login.component';
import { RatingComponent } from './components/rating/rating.component';
import { SavePlaylistComponent } from './components/save-playlist/save-playlist.component';
import { LabelViewComponent } from './components/label-view/label-view.component';
import { CountryViewComponent } from './components/country-view/country-view.component';
import { YearViewComponent } from './components/year-view/year-view.component';
import { RandomPlaylistBottomSheetComponent } from './components/random-playlist-bottom-sheet/random-playlist-bottom-sheet.component';


const appRoutes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'player',component:MusicPlayerComponent},
  {path:'recent',component:RecentAlbumsGridComponent},
  {path:'album/:title',component:AlbumViewComponent},
  {path:'artist/:artist',component:ArtistGridComponent},
  {path:'song/:title',component:SongViewComponent},
  {path:'genre/:genre',component:GenreGridComponent},
  {path:'label/:label',component:LabelViewComponent},
  {path:'country/:country',component:CountryViewComponent},
  {path:'year/:year',component:YearViewComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MusicPlayerComponent,
    AlbumViewComponent,
    NavbarComponent,
    RecentAlbumsGridComponent,
    ArtistGridComponent,
    SongViewComponent,
    SearchBottomSheetComponent,
    GenreGridComponent,
    LoginComponent,
    RatingComponent,
    SavePlaylistComponent,
    LabelViewComponent,
    CountryViewComponent,
    YearViewComponent,
    RandomPlaylistBottomSheetComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    NgxSoundmanager2Module.forRoot(),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgMarqueeModule,
    MaterialModule,
    FormsModule,
    StarRatingModule.forRoot()
  ],
  providers: [
    CookieService,
    {provide:'API_ENDPOINT',useValue:'https://api.outlawdesigns.io:9669/song/'},
    {provide:'LOE_DOMAIN',useValue:'http://loe.outlawdesigns.io/'},
    {provide: 'AUTH_ENDPOINT',useValue:'https://api.outlawdesigns.io:9661/'}
  ],
  entryComponents:[SearchBottomSheetComponent,RatingComponent,SavePlaylistComponent,RandomPlaylistBottomSheetComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
