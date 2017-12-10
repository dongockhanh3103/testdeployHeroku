import { IngredientService } from '../../services/ingredient.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-ingredient',
  templateUrl: './home-ingredient.component.html',
  styleUrls: ['./home-ingredient.component.css']
})
export class HomeIngredientComponent implements OnInit {

  items = [];
  page = 1;
  isEnd = false;
  constructor(private _ingreService: IngredientService) {
    this.fetchPost();
   }

  ngOnInit() {
  }

  fetchPost() {
    console.log('vao');
    if (this.isEnd) {
      return;
    }
    this._ingreService.getIngres(this.page).subscribe(res => {
      this.page++;
      this.items = this.items.concat(res.ingredients);
      console.log(this.items);
      if (res.isEnd) {
        this.isEnd = true;
      }
    });
  }

  onScrollDown() {
    this.fetchPost();
  }
}
