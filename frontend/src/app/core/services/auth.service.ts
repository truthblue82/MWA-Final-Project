import { Injectable, Inject } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { BehaviorSubject, of, EMPTY, Subject } from 'rxjs';
import { AuthData } from '../../features/auth/login/auth.interface';
import jwt_decode from "jwt-decode";
import * as moment from 'moment';

import { environment } from "src/environments/environment";
import { AccountData } from 'src/app/features/account/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userState$ = new BehaviorSubject<{ token: string }>({ token: '' });

  constructor(private http: HttpClient,
    @Inject('LOCALSTORAGE') private localStorage: Storage) {
  }

  login(email: string, password: string) {
    return this.http.post<{token: string}>(`${environment.backendUrl}/employees/login`, { email, password });
  }

  logout(): void {
    this.userState$.next({ token: '' });
    this.localStorage.removeItem('userState');
  }
  getCurrentUser(): AuthData | null {
    let decoded;
    if (this.userState$.value.token) {
      decoded = <AuthData>jwt_decode(this.userState$.value.token);
    } else {
      const tk = <any>this.localStorage.getItem('userState');
      if (tk) {
        this.userState$.next(tk);
        decoded = <AuthData>jwt_decode(tk);
      } else {
        decoded = null;
      }
    }
    //const decoded = this.userState$.value.token && <AuthData>jwt_decode(this.userState$.value.token);

    return decoded;
  }

  persistState() {
    this.localStorage.setItem('userState', JSON.stringify(this.userState$.value));
  }

  getCurrentAccount() {
    const loginUser = this.getCurrentUser();
    return this.http.get<AccountData>(`${environment.backendUrl}/employees/${loginUser?.employeeId}`);
  }

  updateCurrentAccount(accountData: AccountData) {
    console.log('updateCurrentAccount', accountData);
    if (accountData.avatar === '\"') {
      accountData.avatar = "";
    }
    return this.http.put<AccountData>(`${environment.backendUrl}/employees/${accountData._id}`, accountData);
  }

  //from now is not check by 10KG

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
