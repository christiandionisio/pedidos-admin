import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
            private jwtHelper :JwtHelperService ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token') || '';

    if (token != null && !this.jwtHelper.isTokenExpired(token)) {
      const payload = this.getTokenDecoded(token);
      const role = payload.role[0];
      console.log(role);

      return true;
    }

    this.router.navigateByUrl('/login');
    return true;
  }

  getTokenDecoded(token: any) {
    return this.jwtHelper.decodeToken(token);
  }
  
}
