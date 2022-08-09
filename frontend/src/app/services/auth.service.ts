import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import jwt_decode from "jwt-decode";

import { AuthData } from 'src/app/models/auth';
import { AccountData } from 'src/app/models/account';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userState$ = new BehaviorSubject<{ token: string }>({token: ''});

  constructor(
    private http: HttpClient,
    @Inject('LOCALSTORAGE') private localStorage: Storage
  ) { }

  login(email: string, password: string) {
    return this.http.post<{token: string}>(`${environment.backendUrl}/employees/login`, { email, password });
  }

  logout(token: string) {
    //token must be ''
    this.userState$.next({ token: token });
    this.localStorage.removeItem('userState');
    return { message: 'success' };
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
    if (typeof accountData.file !== 'string') {
      const postData = new FormData();
      postData.append('image', accountData.file, accountData.avatar);
      postData.append('role', accountData.role);
      postData.append('gender', accountData.gender);
      postData.append('firstname', accountData.firstname);
      postData.append('lastname', accountData.lastname);
      postData.append('phone', accountData.phone);
      postData.append('username', accountData.username);
      postData.append('address', JSON.stringify(accountData.address));

      return this.http.post<AccountData>(`${environment.backendUrl}/employees/${accountData._id}`, postData);
    }
    else return this.http.put<AccountData>(`${environment.backendUrl}/employees/${accountData._id}`, accountData);
  }
}
