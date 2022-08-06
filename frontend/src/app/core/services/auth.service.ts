import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { BehaviorSubject, of, EMPTY } from 'rxjs';
import { AuthData } from '../../features/auth/login/auth.interface';
import jwt_decode from "jwt-decode";
import * as moment from 'moment';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userState$ = new BehaviorSubject<{ token: string }>({ token: '' });

  constructor(private http: HttpClient,
    /*@Inject('LOCALSTORAGE') private localStorage: Storage*/) {
  }

  login(email: string, password: string) {
    return this.http.post<{token: string}>(`${environment.urlPref}/employees/login`, { email, password });
  }

  logout(): void {
    this.userState$.next({ token: '' });
    localStorage.removeItem('userState');
  }
  getCurrentUser(): AuthData | null {
    const decoded = this.userState$.value.token && <AuthData>jwt_decode(this.userState$.value.token);
    return decoded || null;
  }
  persistState() {
    localStorage.setItem('userState', JSON.stringify(this.userState$.value));
  }

  passwordResetRequest(email: string) {
    return of(true).pipe(delay(1000));
  }

  changePassword(email: string, currentPwd: string, newPwd: string) {
    return of(true).pipe(delay(1000));
  }

  passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
    return of(true).pipe(delay(1000));
  }
}
