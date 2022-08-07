import { Order } from './order';

export interface OrderResponse {
  total: number,
  orders: Order[]
}
