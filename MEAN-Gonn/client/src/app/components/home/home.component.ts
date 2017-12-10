import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items = [];
  page = 1;
  isEnd = false;
  constructor(private _foodService: FoodService, private userService:UserService) {
    this.fetchPost();
    this.test();
  
   }

  ngOnInit() {
  
    
  }

  test(){

    if(localStorage.getItem("token")!==undefined){
      const token= localStorage.token;
      console.log(token);
      this.userService.getUser(token).subscribe(res=>{
        console.log(res.message);
      });
      
    }
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
