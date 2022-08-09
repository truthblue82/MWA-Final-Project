import { initialAuthState, authAdapter } from "../states/auth.state";
  import * as auth from "../actions/auth.actions";
  import { createReducer, on } from "@ngrx/store";
  
  export const authReducer = createReducer(
    initialAuthState,
    on(auth.loadLogin, (state) => ({ ...state, error: false, loading: true })),
    on(auth.loadLoginSuccess, (state, {accessToken}) => 
      authAdapter.addOne(accessToken, {
        ...state,
        error: false,
        loading: false
      })
    ),
    on(auth.loadLoginFailure, (state) =>
      ({
        ...state,
        error: true,
        loading: false
      })
    )
  );
  