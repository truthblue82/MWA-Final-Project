import {
  initialOrderState,
  orderAdapter,
} from "../states/order.state";
import * as order from "../actions/order.actions";
import { createReducer, on } from "@ngrx/store";

export const orderReducer = createReducer(
  initialOrderState,
  on(order.loadingOrders, order.LoadOrder, order.deleteOrder, (state) => ({ ...state, selectedOrderId: null!, loading: true })),
  on(order.loadOrdersSuccess, (state, { response }) =>
    orderAdapter.setAll(response.orders, {
      ...state,
      error: false,
      loading: false,
      total: response.total,
    })
  ),
  on(order.LoadOrderSuccess, (state, { order }) =>
    orderAdapter.addOne(order, {
      ...state,
      error: false,
      loading: false,
      selectedOrderId: order._id
    })
  ),
  on(order.loadOrdersFailure, (state) =>
    orderAdapter.removeAll({
      ...state,
      error: true,
      loading: false,
      total: 0,
    })
  ),
  on(order.LoadOrderFailure, (state, { err }) => ({
      ...state,
      loading: false,
      errorMessage: err.message
  })),
  on(order.deleteOrderSuccess, (state, { order }) =>
    orderAdapter.removeOne(order._id, {
      ...state,
      error: false,
      loading: false,
      selectedOrderId: order._id
    })
  ),
  on(order.deleteOrderFailure, (state, { err }) => ({
      ...state,
      loading: false,
      errorMessage: err.message
  }))
);
