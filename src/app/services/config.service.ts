import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private config:any;

  constructor(private http: HttpClient) { }
  load(): Promise<void>{
    return this.http.get('/assets/config/config.json').toPromise().then(data => { this.config = data });
  }
  get(key:string):any{
    return this.config[key];
  }
}
