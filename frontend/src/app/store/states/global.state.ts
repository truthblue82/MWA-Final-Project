import { OrderState, initialOrderState } from './order.state';
import { initialOrderStatusState, OrderStatusState } from './order-status.state';
import { OrderStatus } from 'src/app/models/order-status';

export interface GlobalState {
  order: OrderState;
  //orderStatusState: OrderStatusState;
}

export const initialGlobalState: GlobalState = {
  order: initialOrderState,
  //orderStatusState: initialOrderStatusState,
};
