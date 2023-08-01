import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SignUP } from 'src/models/sign-up.model';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.createSignUpForm();
  }

  createSignUpForm(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async signUP() {
    this.signUpForm.touched;
    if (!this.signUpForm.valid) {
      return;
    }
    
    try{
    let value = await lastValueFrom(this.loginService.createSignUP(this.getformData()))
    if(value?.message === "successful"){
      this.router.navigate(['/login']);
    }
    console.log(value)
    }catch(error){
      console.log(error);
      if ( error.status === 400) {
        // Handle the specific error message for "User already exists"
        console.log("User already exists. Please use a different email.");
        const emailFormControl = this.signUpForm.get('email');
        if (emailFormControl) {
          // Set the existing email value back to the form control
          const existingEmail = emailFormControl.value;
          emailFormControl.setValue(existingEmail);
          emailFormControl.setErrors({ userExists: true });
        }
    }
    }
  }

  getformData():SignUP{
    let singUPData: SignUP = {
      username: this.signUpForm.get('username').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value
    }
    return singUPData;
  }



}
