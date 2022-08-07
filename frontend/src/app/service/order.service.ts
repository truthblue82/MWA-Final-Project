import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders() {
    console.log('UHRERERERERE');
    const orders = <Order[]> [
      <Order>{
        id: "1",
        sender_name: "A1",
        receiver_name: "B1",
        receiver_phone: "1"
      },
      <Order>{
        id: "2",
        sender_name: "A2",
        receiver_name: "B2",
        receiver_phone: "2"
      },
    ]
    return of(orders).pipe(delay(3000));
    //return this.http.get<Array<Order>>('http://localhost:3000/orders');
  }

  getOrderById(order_id: string) {
    return this.http.get<Order>('http://localhost:3000/orders/' + order_id);
  }

  deleteOrderById(order_id: string) {
    return this.http.delete('http://localhost:3000/orders/' + order_id);
  }

  addNewOrder(order: Order) {
    return this.http.post('http://localhost:3000/orders', order);
  }

  updateOrder(order: Order) {
    return this.http.put('http://localhost:3000/orders/' + order.id, order);

  }

}
