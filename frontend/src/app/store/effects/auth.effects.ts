import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { switchMap, map, catchError, of, Observable } from "rxjs";
import { AuthData } from '../../models/auth';
import { AuthService } from "../../services/auth.service";
import { loadLogin, loadLoginSuccess, loadLoginFailure } from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private service: AuthService) {}

  public processLogin$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(loadLogin),
        switchMap((payload) => {
          return this.service.login(payload.email, payload.password).pipe(
            map(response => {
              return loadLoginSuccess({ accessToken: response.token })
            }),
            catchError((error: HttpErrorResponse) =>
              of(loadLoginFailure({ error }))
            )
          )
          })
      )
  );
}
