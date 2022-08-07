import { ActionReducerMap } from '@ngrx/store';
import { GlobalState } from './states/global.state';
import { orderReducer } from './reducers/order.reducers';

export const reducers: ActionReducerMap<GlobalState> = {
  order: orderReducer
};
