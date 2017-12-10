import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  username:String;
  avatar;
  Authenlogin=false;
  constructor(private authen:AuthenticationService) { 
    const token= localStorage.getItem("token");
    if(token){
      this.Authenlogin=true;
      this.username=localStorage.getItem("username");
      this.avatar =localStorage.getItem("avatar");
    }else{
      this.Authenlogin=false;
    }
  }
  onLogout(){
    this.authen.logout();
  }

  ngOnInit() {
  }

}
