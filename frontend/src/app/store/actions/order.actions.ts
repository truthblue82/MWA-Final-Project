import { createAction, props } from "@ngrx/store";
import { OrderParams } from "../../models/order-params";
import { OrderResponse } from "../../models/order-response";
import { Order } from "../../models/order";

enum OrderActionType {
  LoadingOrders = "[Orders] Loading",
  LoadOrdersSuccess = "[Orders] Loaded Success",
  loadOrdersFailure = "[Orders] Loaded Failure",
  LoadingOrder = "[Order] Loading",
  LoadOrderSuccess = "[Order] Loaded Success",
  loadOrderFailure = "[Order] Loaded Failure",
}

export const loadingOrders = createAction(
  OrderActionType.LoadingOrders,
  props<{ params: OrderParams }>()
);

export const loadOrdersSuccess = createAction(
  OrderActionType.LoadOrdersSuccess,
  props<{ response: OrderResponse }>()
);

export const loadOrdersFailure = createAction(
  OrderActionType.loadOrdersFailure,
  props<{ error: any }>()
);

export const LoadOrder = createAction(
  OrderActionType.LoadingOrder,
  props<{ _id: string }>()
);

export const LoadOrderSuccess = createAction(
  OrderActionType.LoadOrderSuccess,
  props<{ order: Order }>()
);

export const LoadOrderFailure = createAction(
  OrderActionType.loadOrderFailure,
  props<{ err: any }>()
);
