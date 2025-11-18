import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { StarRatingModule } from 'angular-star-rating';
import { NgxSoundmanager2Module } from 'ngx-soundmanager2';
//import { NgMarqueeModule } from 'ng-marquee';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { AppConfigService } from './services/config.service';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecentAlbumsGridComponent } from './components/recent-albums-grid/recent-albums-grid.component';
import { AlbumViewComponent } from './components/album-view/album-view.component';
import { SongViewComponent } from './components/song-view/song-view.component';
import { SearchBottomSheetComponent } from './components/search-bottom-sheet/search-bottom-sheet.component';
import { LoginComponent } from './components/login/login.component';
import { RatingComponent } from './components/rating/rating.component';
import { SavePlaylistComponent } from './components/save-playlist/save-playlist.component';
import { RandomPlaylistBottomSheetComponent } from './components/random-playlist-bottom-sheet/random-playlist-bottom-sheet.component';
import { AuthCallBackHandlerComponent } from './components/auth-call-back-handler/auth-call-back-handler.component';

import {ResultGridComponent} from './components/result-grid/result-grid.component';
import {MyPlaylistBottomSheetComponent} from './components/my-playlist-bottom-sheet/my-playlist-bottom-sheet.component';

import { MaterialModule } from './material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// export function initializeApiClient(api: ApiService) {
//   return () => api.initApiClient();
// }
export function initializeConfig(config: AppConfigService){
  return () => config.load();
}

const appRoutes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'player',component:MusicPlayerComponent},
  {path:'recent',component:RecentAlbumsGridComponent},
  {path:'search/:key/:value',component:ResultGridComponent},
  {path:'song/:title',component:SongViewComponent},
  {path:'album/:title/:artist/:year',component:AlbumViewComponent},
  {path:'login',component:LoginComponent},
  {path:'token',component:AuthCallBackHandlerComponent}
];
const routeOptions: ExtraOptions = {
  scrollPositionRestoration:'top'
};

@NgModule({
  declarations: [
    AppComponent,
    MusicPlayerComponent,
    AlbumViewComponent,
    NavbarComponent,
    RecentAlbumsGridComponent,
    SongViewComponent,
    SearchBottomSheetComponent,
    LoginComponent,
    RatingComponent,
    SavePlaylistComponent,
    ResultGridComponent,
    RandomPlaylistBottomSheetComponent,
    MyPlaylistBottomSheetComponent,
    AuthCallBackHandlerComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes,routeOptions),
    NgxSoundmanager2Module.forRoot(),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // NgMarqueeModule,
    MaterialModule,
    FormsModule,
    StarRatingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    CookieService,
    ApiService,
    AppConfigService,
    { provide: 'API_ENDPOINT', useFactory: (cfg: AppConfigService) => cfg.get('API_ENDPOINT'), deps: [AppConfigService] },
    { provide: 'LOE_DOMAIN', useFactory: (cfg: AppConfigService) => cfg.get('LOE_DOMAIN'), deps: [AppConfigService] },
    { provide: 'AUTH_CLIENT_ID', useFactory: (cfg: AppConfigService) => cfg.get('AUTH_CLIENT_ID'), deps: [AppConfigService] },
    { provide: 'AUTH_DISCOVERY_URI', useFactory: (cfg: AppConfigService) => cfg.get('AUTH_DISCOVERY_URI'), deps: [AppConfigService] },
    { provide: 'AUTH_REDIRECT_URL', useFactory: (cfg: AppConfigService) => cfg.get('AUTH_REDIRECT_URL'), deps: [AppConfigService] },
    { provide: 'AUTH_LOGOUT_URL', useFactory: (cfg: AppConfigService) => cfg.get('AUTH_LOGOUT_URL'), deps: [AppConfigService] },
    { provide: 'AUTH_SCOPE', useFactory: (cfg: AppConfigService) => cfg.get('AUTH_SCOPE'), deps: [AppConfigService] },
    // {provide: APP_INITIALIZER, useFactory: initializeApiClient, deps: [ApiService, AppConfigService], multi: true},
    {provide: APP_INITIALIZER, useFactory: initializeConfig, deps: [AppConfigService], multi: true}
  ],
  entryComponents:[SearchBottomSheetComponent,RatingComponent,SavePlaylistComponent,RandomPlaylistBottomSheetComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
