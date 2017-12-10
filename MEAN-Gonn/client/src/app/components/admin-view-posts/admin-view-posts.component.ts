import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import {  } from '../../services/authentication.service'
@Component({
  selector: 'app-admin-view-posts',
  templateUrl: './admin-view-posts.component.html',
  styleUrls: ['./admin-view-posts.component.css']
})
export class AdminViewPostsComponent implements OnInit {

  items = [];
  page = 1;
  isEnd = false;
  constructor(private _foodService: FoodService,
    private router:Router,
    private authenService:AuthenticationService) {
    const token = localStorage.getItem('token');
    if(token){
      this.authenService.checkCurrentUser(token).subscribe(res=>{
        if(!res.success){
          setTimeout(()=>{
            this.router.navigate(['/home'])
          },0);
        }
      })
      
    }
    else{
      setTimeout(()=>{
        this.router.navigate(['/home'])
      },0);
      
    }
    this.fetchPost();
   }

  ngOnInit() {
  }

  fetchPost() {
    console.log('vao');
    if (this.isEnd) {
      return;
    }
    this._foodService.getPosts(this.page).subscribe(res => {
      this.page++;
      this.items = this.items.concat(res.foods);
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
