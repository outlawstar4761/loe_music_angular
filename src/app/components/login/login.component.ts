import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password:string = '';
  username:string = '';

  constructor(private ApiService:ApiService) { }

  ngOnInit() {
  }
  login():void{
    this.ApiService.login(this.username,this.password);
  }

}
