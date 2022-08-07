import {
  initialOrderState,
  orderAdapter,
} from "../states/order.state";
import * as order from "../actions/order.actions";
import { createReducer, on } from "@ngrx/store";

export const orderReducer = createReducer(
  initialOrderState,
  on(order.loadingOrders, (state) => ({ ...state, loading: true })),
  on(order.loadOrdersSuccess, (state, { response }) =>
    orderAdapter.setAll(response.orders, {
      ...state,
      error: false,
      loading: false,
      total: response.total,
    })
  ),
  on(order.loadOrdersFailure, (state) =>
    orderAdapter.removeAll({
      ...state,
      error: true,
      loading: false,
      total: 0,
    })
  )
);
