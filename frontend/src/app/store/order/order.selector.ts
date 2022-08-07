import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter, ORDER_FEATURE_KEY, OrderEntityState } from './order.reducer';

const selectOrderState = createFeatureSelector<OrderEntityState>(ORDER_FEATURE_KEY);
const { selectAll } = adapter.getSelectors();
//const { selectIds, selectAll, selectEntities, selectTotal } = adapter.getSelectors();

// export const selectOrderIds = createSelector(selectOrderState, selectIds);
// export const selectOrderEntities = createSelector(selectOrderState, selectEntities);
// export const selectOrderTotal = createSelector(selectOrderState, selectTotal);
export const selectAllOrders = createSelector(selectOrderState, selectAll);
// export const selectCurrentOrderId = createSelector(selectOrderState, state => state.selectedOrderId);
// export const selectCurrentOrder = createSelector(
//   selectOrderEntities,
//   selectCurrentOrderId,
//   (postEntities, orderId) => postEntities[orderId],
// );