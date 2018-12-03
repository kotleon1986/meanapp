import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
      private _auth: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this._auth.isAuthenticated()) {
        return false;
      } else {
        const user = this._auth.user();
        const roleCheck = (user && (user.role.name === route.data.role));
        if (!roleCheck) {
          this._auth.logout();
          return false;
        } else {
          return roleCheck;
        }
      }
    }
}
