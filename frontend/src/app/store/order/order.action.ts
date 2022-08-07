import { createAction, props } from '@ngrx/store';
import { Order } from '../../models/order.model';

export const fetchOrders = createAction('[Order] Fetch Orders');
export const selectOrder = createAction('[Order] Select Order', props<{ id: string }>());

export const loadOrders = createAction('[Order] Load Orders', props<{ orders: Order[] }>());