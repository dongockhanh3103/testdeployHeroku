import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  form: FormGroup;
  token:undefined;
  message;
  messageClass;
  flag;
  constructor(private formBuilder: FormBuilder,
    private authenService:AuthenticationService,private route:ActivatedRoute) { 
      this.createForm();
    }

  ngOnInit() {
    this.route.params.subscribe((params: any) => this.token = params.token);
    //console.log(this.token);
    if(this.token!==undefined){
      this.authenService.resetPassword(this.token).subscribe(res=>{
       this.message=res.message;
       this.flag=res.success;
       
      });
    }
  }

  onSubmit(){
    const password={password:this.form.get('password').value
                    ,resetoken:this.token};
    this.authenService.confirmResetPassword(password).subscribe(res=>{
      if(!res.success){
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = res.message; 
      }
      else{
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = res.message; // Set a success message
      }
    });
  }

  createForm(){
    this.form = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
        this.validatePassword // Custom validation
      ])],
        //Retype password input
        retypepassword:['', Validators.required],
        //Dateofbirth Input
        dateofbirth:['']
      },{ validator: this.matchingPasswords('password', 'retypepassword')
    });
  }
    // Function to validate password
    validatePassword(controls) {
      // Create a regular expression
      const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,32}$/);
      // Test password against regular expression
      if (regExp.test(controls.value)) {
        return null; // Return as valid password
      } else {
        return { 'validatePassword': true } // Return as invalid password
      }
    }

     // Funciton to ensure passwords match
   matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }


}
