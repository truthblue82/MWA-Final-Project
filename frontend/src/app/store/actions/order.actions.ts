import { createAction, props } from "@ngrx/store";
import { OrderParams } from "../../models/order-params";
import { OrderResponse } from "../../models/order-response";
import { Order } from "../../models/order";

enum OrderActionType {
  LoadingOrders = "[Orders] Loading",
  LoadOrdersSuccess = "[Orders] Loaded Success",
  LoadOrdersFailure = "[Orders] Loaded Failure",
  LoadingOrder = "[Order] Loading",
  LoadOrderSuccess = "[Order] Loaded Success",
  LoadOrderFailure = "[Order] Loaded Failure",
  DeletingOrder = "[Order] Deleting",
  DeletedOrderSuccess = "[Order] Deleted Success",
  DeletedOrderFailure = "[Order] Deleted Failure"
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
  OrderActionType.LoadOrdersFailure,
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
  OrderActionType.LoadOrderFailure,
  props<{ err: any }>()
);

export const deleteOrder = createAction(
  OrderActionType.DeletingOrder,
  props<{ _id: string }>()
);

export const deleteOrderSuccess = createAction(
  OrderActionType.DeletedOrderSuccess,
  props<{ order: Order }>()
);

export const deleteOrderFailure = createAction(
  OrderActionType.DeletedOrderFailure,
  props<{ err: any }>()
);
