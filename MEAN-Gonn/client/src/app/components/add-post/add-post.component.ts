import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodService } from '../../services/food.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  form: FormGroup;
  id: undefined;
  food = {
    title: '',
    body: '',
    type: [],
    backdrop: ''
  };
  type = [];
  constructor(private formBuilder: FormBuilder, private foodService: FoodService,  private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      type: [[], Validators.required],
      backdrop: ['', Validators.required]
    });
  }


  ngOnInit() {
    // if update
    this.route.params.subscribe((params: any) => this.id = params.id);
    console.log(this.id);
    if (this.id !== undefined) {
      this.foodService.getPost(this.id).subscribe(res => {
        this.food = res.food;
        for (let i = 0; i < this.food.type.length; i++) {
          this.type.push({display: this.food.type[i],
                          value: this.food.type[i]});
      }
      });
    }
  }

  onSubmit() {
    // parse taginput to string array
    console.log(this.type);
    const temp = [];
    for (let i = 0; i < this.type.length; i++) {
        temp.push(this.type[i].value);
    }
    this.food.type = temp;
    console.log(temp);
    console.log(this.food);
    if (this.id !== undefined) {
        // update post
      this.foodService.updatePost(this.food, this.id).subscribe(res => {
        console.log(res);
      });
    } else {
      // create post
      this.foodService.createPost(this.food).subscribe(res => {
        console.log(res);
      });
    }
  }



}
