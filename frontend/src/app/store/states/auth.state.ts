import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { AuthData } from "src/app/models/auth";


export interface AuthState extends EntityState<AuthData> {
  error: boolean;
  success: boolean;
}

export const authAdapter: EntityAdapter<AuthData> = createEntityAdapter<AuthData>({
  selectId: (authData: AuthData) => authData.employeeId
});

export const initialAuthState: AuthState = authAdapter.getInitialState({
  error: false,
  success: false
});

