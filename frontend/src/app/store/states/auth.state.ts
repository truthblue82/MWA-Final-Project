import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AuthData } from '../../models/auth';

export interface AuthState extends EntityState<any> {
  error: boolean;
  loading: boolean;
  token: string;
}

export const authAdapter: EntityAdapter<string> = createEntityAdapter<string>({
  selectId: (auth: string) => auth
});

export const initialAuthState: AuthState = authAdapter.getInitialState({
  error: false,
  loading: false,
  token: null!
});
