import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

interface IForm{
  option:string,
  query:string
}

@Component({
  selector: 'app-search-bottom-sheet',
  templateUrl: './search-bottom-sheet.component.html',
  styleUrls: ['./search-bottom-sheet.component.css']
})

export class SearchBottomSheetComponent implements OnInit {
  searchOptions:any[] = [
    {display:'Song',route:'song'},
    {display:'Album',route:'album'},
    {display:'Artist',route:'artist'},
    {display:'Label',route:'label'},
    {display:'Country',route:'country'},
    {display:'Genre',route:'genre'},
    {display:'Year',route:'year'}
  ];

  constructor(private bottomSheetRef:MatBottomSheetRef<NavbarComponent>,private router:Router) { }

  onSubmit(value:IForm):void{
    console.log(value);
    let path = '';
    if(value.option != 'song'){
      path += 'search/';
    }
    path += value.option + '/' + value.query;
    this.router.navigateByUrl(path);
    this.bottomSheetRef.dismiss();
  }

  ngOnInit() {
  }

}
