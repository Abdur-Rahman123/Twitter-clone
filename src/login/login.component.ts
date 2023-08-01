import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Login } from 'src/models/login.model';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router) { 
    this.createLoginForm();
  }

  ngOnInit(): void {
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

 async onSubmit() {
    this.loginForm.touched;
    if (!this.loginForm.valid) {
      return ;
    }

    try{
      let value = await lastValueFrom(this.loginService.createLogin(this.getformData()))
      console.log(value);
      localStorage.setItem('jwtToken', value?.token);
      this.router.navigate(['/home']);
      console.log(value)
      }catch(error){}
  }


  getformData():Login{
    let loginData: Login = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    return loginData;
  }

}
