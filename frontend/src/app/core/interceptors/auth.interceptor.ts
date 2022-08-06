import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const user = this.authService.getCurrentUser();
    const token = localStorage.getItem('userState');

      if (user && token) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token)
        });

        return next.handle(cloned).pipe(tap(() => { }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
                this.dialog.closeAll();
                this.router.navigate(['auth/login']);
            }
          }
        }));

      } else {
        return next.handle(req);
      }
  }
}
