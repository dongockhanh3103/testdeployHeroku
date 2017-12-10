import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formSignUp: FormGroup;
  message;
  messageClass;

  constructor( private formBuilder: FormBuilder,
              private authenService:AuthenticationService) {
    this.createForm();
   }
  
    ngOnInit() {
    }

    onRegisterSubmit() {
        const user={
          email:this.formSignUp.get('email').value,
          firstname:this.formSignUp.get('firstname').value,
          lastname:this.formSignUp.get('lastname').value,
          password:this.formSignUp.get('password').value,
          birthday:this.formSignUp.get('dateofbirth').value
        }
        this.authenService.registerUser(user).subscribe(data=>{
          if(!data.success){
            this.messageClass = 'alert alert-danger'; // Set an error class
            this.message = data.message; 
          }
          else{
            this.messageClass = 'alert alert-success'; // Set a success class
            this.message = data.message; // Set a success message
          }
       
          });
    }
  createForm(){
    
    this.formSignUp = this.formBuilder.group({
      //Firstname input
      firstname: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 5 characters
        Validators.maxLength(30),
        this.validateFirstname
      ])],
      //Lastname input
      lastname:[''],
      //Email input
      email:['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30),
        this.validateEmail
      ])],
     // Password Input
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
    },{ validator: this.matchingPasswords('password', 'retypepassword') });

  }

   // Function to validate username is proper format
   validateFirstname(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z. ]+$/);
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateFirstname': true } // Return as invalid username
    }
  }
  // Function to validate e-mail is proper format
  validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
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
