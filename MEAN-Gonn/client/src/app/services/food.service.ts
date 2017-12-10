import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable()
export class FoodService {
  constructor(private _http: Http) { }

  getPost(id: String) {
    return this._http.get('/api/food/' + id)
    .map(res => res.json());
  }

  getPosts(page: Number) {
    return this._http.get('/api/food/page/' + page)
      .map(res => res.json());
  }

  createPost(food) {
    return this._http.post('/api/food', food)
      .map(res => res.json());
  }

  updatePost(food, id: String) {
    return this._http.put('/api/food/' + id, food)
    .map(res => res.json());
  }

}
