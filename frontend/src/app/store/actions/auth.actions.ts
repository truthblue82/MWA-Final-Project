import { createAction, props } from "@ngrx/store";
import { AccountData } from "../../models/account";
import { AuthData } from "../../models/auth";

enum ActionType {
  LoadingLogin = "[Login] Loading",
  LoadLoginSuccess = "[Login] Loaded Success",
  LoadLoginFailure = "[Login] Loaded Failure"
}

export const loadLogin = createAction(
  ActionType.LoadingLogin,
  props<{ email: string, password: string }>()
);

export const loadLoginSuccess = createAction(
  ActionType.LoadLoginSuccess,
  props<{ accessToken: string }>()
);

export const loadLoginFailure = createAction(
  ActionType.LoadLoginFailure,
  props<{ error: any }>()
);
