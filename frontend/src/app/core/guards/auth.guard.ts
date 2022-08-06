import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
    private notificationService: NotificationService,
    private authService: AuthenticationService) { }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    //return this.checkLogin(url);
    return true;
  }

  canActivate() {
    const user = this.authService.getCurrentUser();
    if (user && user.exp) {

      if (parseInt(moment().format('X')) < user.exp) {
          return true;
      } else {
          this.notificationService.openSnackBar('Your session has expired');
          this.router.navigate(['auth/login']);
          return false;
      }
    }

    this.router.navigate(['auth/login']);
    return false;
  }
}
