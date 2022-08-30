import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { SearchBottomSheetComponent } from '../search-bottom-sheet/search-bottom-sheet.component';
import { RandomPlaylistBottomSheetComponent } from '../random-playlist-bottom-sheet/random-playlist-bottom-sheet.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private bottomSheet:MatBottomSheet) {}

  showSearch():void{
    this.bottomSheet.open(SearchBottomSheetComponent);
  }
  showRandomPlayList():void{
    this.bottomSheet.open(RandomPlaylistBottomSheetComponent);
  }

}
