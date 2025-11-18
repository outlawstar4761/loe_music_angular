import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-auth-call-back-handler',
  templateUrl: './auth-call-back-handler.component.html',
  styleUrls: ['./auth-call-back-handler.component.css']
})
export class AuthCallBackHandlerComponent implements OnInit {

  error:string;
  errorDescription:string;

  constructor(private route: ActivatedRoute,private api:ApiService) {
    this.error = '';
    this.errorDescription = '';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['code']){
        this.api.swapAuthorizationToken(params['code']);
      }else if(params['error']){
        // console.log(params['error']);
        this.error = params['error'];
        this.errorDescription = params['error_description'];
      }else{
        // console.log('unknown error occurred...');
        this.error = 'An unknown error has occurred';
        this.errorDescription = 'Please try again later.';
      }
    });
  }

}
