import { createAction, props } from "@ngrx/store";
import { AccountData } from "src/app/models/account";
import { AuthData } from "src/app/models/auth";


enum AuthenActionType{
  login = "[Login Page] login",
  logout = "[Login Page] logout",
  signup = "[Signup Page] signup",
  updateMe = "[Account Page] update"
}

export const login = createAction(
  AuthenActionType.login,
  props<{ email: string, password: string }>()
);

export const logout = createAction(
  AuthenActionType.logout,
  props<{ token: string }>()
);

export const updateMe = createAction(
  AuthenActionType.updateMe,
  props<{ profile: AccountData }>()
);
