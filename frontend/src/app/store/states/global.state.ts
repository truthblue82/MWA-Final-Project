import { OrderState, initialOrderState } from './order.state';
import { AuthState, initialAuthState } from './auth.state';
import { OrderStatus } from 'src/app/models/order-status';

export interface GlobalState {
  order: OrderState;
  auth: AuthState;
}

export const initialGlobalState: GlobalState = {
  order: initialOrderState,
  auth: initialAuthState,
};
