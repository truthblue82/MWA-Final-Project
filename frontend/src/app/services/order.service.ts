import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Order } from '../models/order';
import { OrderParams } from '../models/order-params';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { OrderResponse } from '../models/order-response';
import { environment } from "src/environments/environment";


@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  public getOrders(params: OrderParams): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(`${environment.backendUrl}/orders`);
  }

  public addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.backendUrl}/orders`, order);
  }

  public getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${environment.backendUrl}/orders/${orderId}`);
  }

  public updateOrderById(orderId: string, updatedOrder: Order): Observable<Order> {
    return this.http.put<Order>(`${environment.backendUrl}/orders/${orderId}`, updatedOrder);
  }
}
