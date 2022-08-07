import * as fromOrder from './order/order.reducer';

export interface State {
  [fromOrder.ORDER_FEATURE_KEY]: fromOrder.OrderEntityState;
}

export { fromOrder };