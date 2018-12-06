import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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

const appRoutes: Routes = [
  {path:'',redirectTo:'/recent',pathMatch:'full'},
  {path:'player',component:MusicPlayerComponent},
  {path:'recent',component:RecentAlbumsGridComponent},
  {path:'album/:title',component:AlbumViewComponent},
  {path:'artist/:artist',component:ArtistGridComponent},
  {path:'song/:title',component:SongViewComponent},
  {path:'genre/:genre',component:GenreGridComponent}
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
    GenreGridComponent
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
    {provide:'API_ENDPOINT',useValue:'http://outlawdesigns.ddns.net/API/LOE/music/'},
    {provide:'LOE_DOMAIN',useValue:'http://outlawdesigns.ddns.net'}
  ],
  entryComponents:[SearchBottomSheetComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
