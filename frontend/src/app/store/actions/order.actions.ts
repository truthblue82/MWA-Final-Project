import { createAction, props } from "@ngrx/store";
import { OrderParams } from "../../models/order-params";
import { OrderResponse } from "../../models/order-response";

enum OrderActionType {
  Loading = "[Order] Loading",
  LoadOrdersSuccess = "[Order] Loaded Success",
  loadOrdersFailure = "[Order] Loaded Failure",
}

export const loadingOrders = createAction(
  OrderActionType.Loading,
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
