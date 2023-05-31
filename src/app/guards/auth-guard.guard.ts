import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'app/services/authentication.service';



@Injectable({
  providedIn: 'root',
})
export class PermissionsService {

  constructor(private authService:AuthService){}

  canActivate(): boolean {
    return this.authService.isloggedIn()
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
