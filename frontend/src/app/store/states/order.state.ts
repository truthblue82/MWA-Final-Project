import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Order } from '../../models/order';

export interface OrderState extends EntityState<Order> {
  error: boolean;
  loading: boolean;
  total: number;
  selectedOrderId: string;
}

export const orderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order: Order) => order._id
});

export const initialOrderState: OrderState = orderAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0,
  selectedOrderId: null!
});
