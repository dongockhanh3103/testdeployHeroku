import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map';
@Injectable()
export class ActivationService {
  domain = "http://localhost:3000";
  constructor(private http: Http) { }
  authToken(token: String) {
    return this.http.get('/user/activate/'+ token)
    .map(res => res.json());
    
  }

}
