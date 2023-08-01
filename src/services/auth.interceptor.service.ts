// auth-interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      // Clone the request and add the Authorization header with the JWT token
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP errors, including token expiration
        if (error.status === 401 || error.status === 403) {
          this.authService.logout(); // Redirect to login page
        }
        return throwError(error);
      })
    );
  }
}
