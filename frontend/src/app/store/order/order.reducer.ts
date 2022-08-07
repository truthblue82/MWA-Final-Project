import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Order } from '../../models/order.model';
import { loadOrders, selectOrder } from './order.action';

export const ORDER_FEATURE_KEY = 'orders';
export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export interface OrderEntityState extends EntityState<Order> {
  selectedOrderId: string | null;
}

export const initialState: OrderEntityState = adapter.getInitialState({
  selectedOrderId: null,
});

export const orderReducer = createReducer(
  initialState,
  on(selectOrder, (state, { id }) => ({ ...state, selectedOrderId: id })),
  on(loadOrders, (state, { orders }) => adapter.addMany(orders, { ...state, selectedOrderId: null })),
);

// export function reducer(state: OrderEntityState | undefined, action: Action) {
//   return _orderReducer(state, action);
// }