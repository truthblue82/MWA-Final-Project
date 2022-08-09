import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Order } from '../models/order';
import { OrderParams } from '../models/order-params';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { OrderResponse } from '../models/order-response';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {

  }

  public getOrders(params: OrderParams): Observable<Array<Order>> {
    return this.http.get<Array<Order>>('http://localhost:3000/orders');
  }

  public getOrderById(_id: String): Observable<Order> {
    return this.http.get<Order>(`http://localhost:3000/orders/${_id}`);
  }
}