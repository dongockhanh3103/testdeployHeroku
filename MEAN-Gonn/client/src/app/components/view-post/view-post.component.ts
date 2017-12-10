import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  post = {
    title: String,
    body: String,
    type: String,
    backdrop: String,
    posted: Date
  };

  constructor(private _foodService: FoodService, private route: ActivatedRoute) {
    let id: any;
    this.route.params.subscribe((params: any) => id = params.id);
    this._foodService.getPost(id).subscribe(res => this.post = res.food);
  }

  ngOnInit() {

  }

}
