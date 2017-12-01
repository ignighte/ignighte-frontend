import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate() {
    var jwt = localStorage.getItem('token');
    if (jwt) {
      return true;
    } else {
      alert('you are not logged in');
      this.router.navigate(['/login']);
      return false;
    }
  }
}