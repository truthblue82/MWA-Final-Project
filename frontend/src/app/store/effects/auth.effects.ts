import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { exhaustMap, map, catchError } from "rxjs/operators";

//import { AuthenticationService } from "src/app/core/services/auth.service";
import { AuthService } from "src/app/services/auth.service";
import { login, logout } from "src/app/store/actions/auth.actions";
import {
  loginSuccess, loginFailure,
  logoutSuccess, logoutFailure
} from "../actions/authApi.actions";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(action => this.authService.login(action.email, action.password).pipe(
        map(user => loginSuccess(user)),
        catchError(error => of(loginFailure(error)))
      )
      )
    )
  );

  // logout$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(logout),
  //     exhaustMap(action => this.authService.logout(action.token).pipe(
  //       map(result => logoutSuccess(result)),
  //       catchError(error => of(logoutFailure(error)))
  //     ))
  //   )
  // );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }
}
