import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { switchMap, map, catchError, of, Observable, delay } from "rxjs";
import { OrderParams } from "../../models/order-params";
import { Order } from '../../models/order';
import { OrderResponse } from "../../models/order-response";
import { OrderService } from "../../services/order.service";
import { loadOrdersFailure, loadOrdersSuccess, loadingOrders, LoadOrderFailure, LoadOrderSuccess, LoadOrder } from "../actions/order.actions";

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private service: OrderService) {}

  public loadOrders$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(loadingOrders),
        switchMap((payload: { params: OrderParams }) =>
          this.service.getOrders(payload.params).pipe(
            map((response: Array<Order>) => {
              const data = this.getFilterOrder(response, payload.params);
              return  loadOrdersSuccess({ response: data });
            }),
            catchError((error: HttpErrorResponse) =>
              of(loadOrdersFailure({ error }))
            )
          )
        )
      )
  );

  public loadOrder$ = createEffect((): Observable<Action> => this.actions$.pipe(
    ofType(LoadOrder),
    map((action) => action._id),
    switchMap(_id => {
      return this.service.getOrderById(_id).pipe(
        map((order: Order) => {
          return LoadOrderSuccess({order});
        }),
        catchError(err => of(LoadOrderFailure({err})))
      );
    })
  ));

  private getFilterOrder(orders: Order[], params: OrderParams): OrderResponse {
    let data = <Order[]>[];

    data = orders.filter(c => ~(c.senderName.toLocaleLowerCase()).indexOf(params.filter)
      || ~(c.senderPhone).indexOf(params.filter)
      || ~(c.senderPhone.toLocaleLowerCase()).indexOf(params.filter)
      || ~(c.receiverPhone).indexOf(params.filter));  

    data.sort(
      (a, b) =>
        ((a as any)[params.sortField] > (b as any)[params.sortField] ? 1 : -1) *
        (params.sortDirection === "asc" ? 1 : -1)
    );    
    
    return {
      total: data.length,
      orders: data.slice((params.pageIndex) * params.pageSize, (params.pageIndex + 1) * params.pageSize)
    };
  }
}
