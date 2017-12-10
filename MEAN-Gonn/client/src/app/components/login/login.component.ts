import { Component, OnInit,NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
//import { AuthService, AppGlobals } from 'angular2-google-login';
import { UserService } from '../../services/user.service';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  formSignIn: FormGroup;
  message;
  messageClass;
  imageURL: string;
  email: string;
  name: string;
  token: string;
  constructor(private formBuilder: FormBuilder,
    private authenService: AuthenticationService,
    private router:Router, private zone: NgZone,
    private fb: FacebookService,
    private userService:UserService,
    private route: ActivatedRoute){
    this.createForm();
    console.log('Initializing Facebook');
    
        fb.init({
          appId: '1879403279041868',
          version: 'v2.10'
        });
    
  }

  ngOnInit() {
  }
  login() {
    this.fb.login()
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
      })
      .catch(this.handleError);
    
  }

 

 
  createForm() {
    this.formSignIn = this.formBuilder.group({
      email: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }

  onLoginSubmit() {
    const user = {
      email: this.formSignIn.get("email").value,
      password: this.formSignIn.get("password").value
    };
    this.authenService.login(user).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; 
      }
      else{
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = data.message; // Set a success message
        const username=data.firstname + " " +data.lastname;
        this.authenService.storeUserData(data.token,username,data.avatar);
        this.authenService.createAuthenticationHeaders();
        setTimeout(()=>{
          window.location.reload();
          this.router.navigate(['/home'])
        },500);
      }
    });
  }

    /**
   * This is a convenience method for the sake of this example project.
   * Do not use this in production, it's better to handle errors separately.
   * @param error
   */
  private handleError(error) {
    console.error('Error processing action', error);
  }

}
