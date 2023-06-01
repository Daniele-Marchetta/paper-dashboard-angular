import { Router } from '@angular/router';
import { TokenInterceptorService } from './token-interceptor.service';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { loginUrl, logoutUrl, registerUrl } from 'app/endPoints';
import { authResponse, loginRequest, registerRequest } from 'app/interfaces/authentication';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private router:Router) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  authenticate(obj: loginRequest) {
    return this.http
      .post<authResponse>(loginUrl, obj, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  register(obj: registerRequest) {
    return this.http
      .post<authResponse>(registerUrl, obj, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(): string {
    return localStorage.getItem('token') || '';
  }
  logout() {
    return this.http
      .post(logoutUrl, '')
      .pipe(catchError(this.handleError));
  }

  isloggedIn(): boolean {
    const token: string = this.getToken();
    if (token != '') {
      const tokenParts = token.split('.');
      const tokenPayload = JSON.parse(atob(tokenParts[1]));
      const expDate = new Date(tokenPayload.exp * 1000);
      const currentDate = new Date();
      const isTokenValid = currentDate < expDate;
      if(!isTokenValid){
        this.router.navigateByUrl("/login");
      }
      return isTokenValid;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
