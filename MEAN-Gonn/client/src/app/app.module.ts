
import { IngredientService } from './services/ingredient.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { TagInputModule } from 'ngx-chips';
import { AddPostComponent } from './components/add-post/add-post.component';
import { FoodService } from './services/food.service';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthenticationService } from './services/authentication.service';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ActiveAccountComponent } from './components/active-account/active-account.component'
import { ActivationService} from './services/activation.service';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { FacebookModule } from 'ngx-facebook';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { AdminViewPostsComponent } from './components/admin-view-posts/admin-view-posts.component';
import { AddIngredientComponent } from './components/add-ingredient/add-ingredient.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { HomeIngredientComponent } from './components/home-ingredient/home-ingredient.component';
import { UserService } from './services/user.service';


TagInputModule.withDefaults({
  tagInput: {
    secondaryPlaceholder: 'Nhập loại món ăn'
  }
});
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,

    LoginComponent,
    SignupComponent,
    ForgetpasswordComponent,
    ActiveAccountComponent,
    ResetpasswordComponent,
    AddPostComponent,
    ViewPostComponent,
    AdminViewPostsComponent,
    AddIngredientComponent,
    HomeIngredientComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    CKEditorModule,

  
    TagInputModule,
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    FacebookModule.forRoot()
  ],
  providers: [FoodService,AuthenticationService,ActivationService,IngredientService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
