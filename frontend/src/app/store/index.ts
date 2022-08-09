import { ActionReducerMap } from '@ngrx/store';
import { GlobalState } from './states/global.state';
import { orderReducer } from './reducers/order.reducers';
import { authReducer } from './reducers/auth.reducers';

export const reducers: ActionReducerMap<GlobalState> = {
  order: orderReducer,
  auth: authReducer
};
