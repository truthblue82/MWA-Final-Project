import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { OrdersService } from '../../service/order.service';

import { fetchOrders, loadOrders } from './order.action';

@Injectable()
export class OrderEffects {
  fetchOrdersEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fetchOrders),
      mergeMap(() => this.orderService.getOrders().pipe(
        map(orders => loadOrders({ orders }))
      ))
    )
  );

  constructor(private action$: Actions, private orderService: OrdersService) {}
}