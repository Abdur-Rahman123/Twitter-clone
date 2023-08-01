import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    const jwtToken = localStorage.getItem('jwtToken');
    return !!jwtToken; // Change this based on your token validation logic
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
}
