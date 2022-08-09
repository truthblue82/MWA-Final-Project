import { createReducer, on } from "@ngrx/store";
import { STATUS_CODES } from "http";
import { login } from '../actions/auth.actions';
import { loginSuccess, loginFailure } from "../actions/authApi.actions";
import { initialAuthState, authAdapter } from "../states/auth.state";

// export const authReducer = createReducer(
//   initialAuthState,
//   on(login, state => ({ ...state, success: state.success, error: state.error })),
//   on(loginSuccess, (state, { response }) => authAdapter.setOne()),
// );
