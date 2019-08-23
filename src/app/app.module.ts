import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

const appRoutes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'player',component:MusicPlayerComponent},
  {path:'recent',component:RecentAlbumsGridComponent},
  {path:'album/:title',component:AlbumViewComponent},
  {path:'artist/:artist',component:ArtistGridComponent},
  {path:'song/:title',component:SongViewComponent},
  {path:'genre/:genre',component:GenreGridComponent},
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
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    NgxSoundmanager2Module.forRoot(),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgMarqueeModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    CookieService,
    {provide:'API_ENDPOINT',useValue:'http://api.outlawdesigns.io:9669/music/'},
    {provide:'LOE_DOMAIN',useValue:'http://loe.outlawdesigns.io/'},
    {provide: 'AUTH_ENDPOINT',useValue:'http://api.outlawdesigns.io:9669/'}
  ],
  entryComponents:[SearchBottomSheetComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
