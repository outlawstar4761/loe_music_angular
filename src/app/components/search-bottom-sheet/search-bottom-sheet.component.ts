import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-search-bottom-sheet',
  templateUrl: './search-bottom-sheet.component.html',
  styleUrls: ['./search-bottom-sheet.component.css']
})
export class SearchBottomSheetComponent implements OnInit {
  searchOptions:any[] = [{display:'Song',route:'song'},{display:'Album',route:'album'},{display:'Artist',route:'artist'}];

  constructor(private bottomSheetRef:MatBottomSheetRef<NavbarComponent>,private router:Router) { }

  onSubmit(value):void{
    let path = value.option + '/' + value.query;
    this.router.navigateByUrl(path);
    this.bottomSheetRef.dismiss();
  }

  ngOnInit() {
  }

}
