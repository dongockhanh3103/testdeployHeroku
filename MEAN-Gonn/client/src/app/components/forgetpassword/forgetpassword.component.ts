import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service'
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  form: FormGroup;
  message;
  messageClass;
  constructor(private formBuilder: FormBuilder, private authService:AuthenticationService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.form= this.formBuilder.group({
      email:['']

    });
  }

  onSend(){
    const email={email:this.form.get('email').value};
    this.authService.forgotPassword(email).subscribe(res=>{
      if(!res.success){
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = res.message; 
      }else{
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = res.message; // Set a success message
      }
    });


  }

}
