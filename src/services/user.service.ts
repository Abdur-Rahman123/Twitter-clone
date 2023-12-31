import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Follow } from 'src/models/follow.model';
import { SearchUser } from 'src/models/search-user.model';

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

  followAUser(user_id: Follow): Observable<any> {
    return this.http.post<any>(this.BASE_URL+'follow', user_id);
  }

  unFollowAUser(user_id: Follow): Observable<any> {
    return this.http.post<any>(this.BASE_URL+'unfollow', user_id);
  }

  getFollowersList(id:number): Observable<any> {
    return this.http.get<any>(this.BASE_URL+`users/${id}/followers`);
  }

  getFollowingList(id:number): Observable<any> {
    return this.http.get<any>(this.BASE_URL+`users/${id}/following`);
  }

  getTweetById(id:number): Observable<any> {
    return this.http.get<any>(this.BASE_URL+`users/${id}/tweets`);
  }

  searchByUserName(search:SearchUser): Observable<any> {
    return this.http.post<any>(this.BASE_URL+`search`,search);
  }

  getTimeLinePost(): Observable<any> {
    return this.http.get<any>(this.BASE_URL+`timeline`);
  }
}
