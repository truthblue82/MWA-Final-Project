import { OrderState, initialOrderState } from './order.state';

export interface GlobalState {
  order: OrderState;
}

export const initialGlobalState: GlobalState = {
  order: initialOrderState
};
