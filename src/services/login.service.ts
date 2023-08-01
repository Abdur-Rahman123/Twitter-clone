import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignUP } from 'src/models/sign-up.model';
import { Login } from 'src/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private BASE_URL = 'https://missingdata.pythonanywhere.com/';
  constructor(private http: HttpClient) { }

  createSignUP(signUP: SignUP): Observable<any> {
    return this.http.post<any>(this.BASE_URL+'/signup', signUP);
  }

  createLogin(login: Login): Observable<any> {
    return this.http.post<any>(this.BASE_URL+'/login', login);
  }
}
