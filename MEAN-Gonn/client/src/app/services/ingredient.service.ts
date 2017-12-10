import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class IngredientService {
  constructor(private _http: Http) { }

    getIngre(id: String) {
      return this._http.get('/api/ingredient/' + id)
      .map(res => res.json());
    }

    getIngres(page: Number) {
      return this._http.get('/api/ingredients/page/' + page)
        .map(res => res.json());
    }

    createIngre(ingre) {
      return this._http.post('/api/ingredient', ingre)
        .map(res => res.json());
    }

    updateIngre(ingre, id: String) {
      return this._http.put('/api/ingredient/' + id, ingre)
      .map(res => res.json());
    }
}
