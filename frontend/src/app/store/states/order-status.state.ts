import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { OrderStatus } from "src/app/models/order-status";
import { Order } from '../../models/order';
import { orderAdapter } from "./order.state";

export interface OrderStatusState extends EntityState<OrderStatus> {
  New: number;
  Processing: number;
  OnTheWay: number;
  Pending: number;
  Arrived: number;
  Delivered: number;
  Completed: number;
  Failed: number;
}

export const initialOrderStatusState: OrderStatus = {
  New: 1,
  Processing: 0,
  OnTheWay: 0,
  Pending: 0,
  Arrived: 0,
  Delivered: 0,
  Completed: 0,
  Failed: 0
};

