import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { switchMap, map, catchError, of, Observable } from "rxjs";
import { OrderParams } from "../../models/order-params";
import { OrderResponse } from "../../models/order-response";
import { OrderService } from "../../services/order.service";
import { loadOrdersFailure, loadOrdersSuccess, loadingOrders } from "../actions/order.actions";

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private service: OrderService) {}

  public loadOrder$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(loadingOrders),
        switchMap((payload: { params: OrderParams }) =>
          this.service.getOrders(payload.params).pipe(
            map((response: OrderResponse) =>
              loadOrdersSuccess({ response })
            ),
            catchError((error: HttpErrorResponse) =>
              of(loadOrdersFailure({ error }))
            )
          )
        )
      )
  );
}
