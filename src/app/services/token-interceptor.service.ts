import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './authentication.service';
import { serverUrl } from 'app/endPoints';


@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService:AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(`${serverUrl}api/auth/`)) {
      let jwtreq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.getToken(),
        },
      });
      return next.handle(jwtreq);
    }else{
      return next.handle(req);
    }
  }
}
