import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrderState, orderAdapter } from '../states/order.state';

export const {
  selectIds: _selectOrderDataIds,
  selectEntities: _selectOrderEntities,
  selectAll: _selectAllOrder,
  selectTotal: _selectOrderTotal
} = orderAdapter.getSelectors();

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectOrderIds = createSelector(
  selectOrderState,
  _selectOrderDataIds
);

export const selectOrderEntities = createSelector(
  selectOrderState,
  _selectOrderEntities
);

export const selectAllOrder = createSelector(
  selectOrderState,
  _selectAllOrder
);

export const selectOrderError = createSelector(
  selectOrderState,
  (state: OrderState): boolean => state.error
);

export const selectOrderLoading = createSelector(
  selectOrderState,
  (state: OrderState): boolean => state.loading
);

export const selectOrderTotal = createSelector(
  selectOrderState,
  (state: OrderState): number => state.total
);

export const getCurrentOrderId = createSelector(
  selectOrderState,
  (state : OrderState) => state.selectedOrderId
);

export const getCurrentOrder = createSelector(
  selectOrderState,
  getCurrentOrderId,
  state => state.entities[state.selectedOrderId]
);
