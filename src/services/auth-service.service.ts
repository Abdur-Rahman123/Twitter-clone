import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    const jwtToken = localStorage.getItem('jwtToken');
    return !!jwtToken; // Change this based on your token validation logic
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }
  getMyUserId(): number {
    let response = this.getDecodedAccessToken(this.getToken());
    return response?.id;
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
