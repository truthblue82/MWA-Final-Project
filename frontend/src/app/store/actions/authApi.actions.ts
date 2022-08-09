import { createAction, props } from "@ngrx/store";


enum AuthApiActionType {
  loginSuccess = "[Login page] success",
  loginFailure = "[Login page] failure",
  logoutSuccess = "[Logout Function] success",
  logoutFailure = "[Logout Function] failure",
  signupSuccess = "[Signup Page] success",
  signupFailure = "[Signup Page] failure",
  updateMeSuccess = "[Account Page] update success",
  updateMeFailure = "[Account Page] update failure"
}

export const loginSuccess = createAction(
  AuthApiActionType.loginSuccess,
  props<{ token: string }>()
);

export const loginFailure = createAction(
  AuthApiActionType.loginFailure,
  props<{ error: string }>()
);

export const logoutSuccess = createAction(
  AuthApiActionType.logoutSuccess,
  props<{ message: string }>()
);

export const logoutFailure = createAction(
  AuthApiActionType.logoutFailure,
  props<{ error: string }>()
);
