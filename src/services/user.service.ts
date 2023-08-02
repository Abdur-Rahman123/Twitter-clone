import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = 'https://missingdata.pythonanywhere.com/';
  constructor(private http: HttpClient) { }

  createTweet(content: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL+'tweet', content);
  }

  getUserList(): Observable<any> {
    return this.http.get<any>(this.BASE_URL+'users');
  }
}
