import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Order } from '../models/order';
import { OrderParams } from '../models/order-params';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { OrderResponse } from '../models/order-response';
import { environment } from "src/environments/environment";
import { Warehouse } from "../models/warehouse";


@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  public getOrders(params: OrderParams): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(`${environment.backendUrl}/orders`);
  }

  public addOrder(order: Order): Observable<Order> {
    //build formData because of image uploading
    const postData = new FormData();
    postData.append('imageFile', order.imageFile, order.imageName);
    postData.append('senderName', order.senderName);
    postData.append('senderPhone', order.senderPhone);
    postData.append('senderEmail', order.senderEmail);
    postData.append('senderAddress', order.senderAddress);
    postData.append('receiverName', order.receiverName);
    postData.append('receiverPhone', order.receiverPhone);
    postData.append('receiverEmail', order.receiverEmail);
    postData.append('receiverAddress', order.receiverAddress);
      //define fo routes //
    postData.append('cost', order.cost.toString());
    postData.append('size', order.size);
    postData.append('orderValue', order.orderValue.toString());
    postData.append('tax', order.tax.toString());
    postData.append('total', order.total.toString());
    postData.append('weight', order.weight.toString());
    postData.append('insurance', order.insurance.toString());
    postData.append('orderDate', order.orderDate.toString());
    postData.append('note', order.note);
    postData.append('routes', JSON.stringify(order.routes));

    return this.http.post<Order>(`${environment.backendUrl}/orders`, postData);
  }

  public getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${environment.backendUrl}/orders/${orderId}`);
  }

  public updateOrderById(orderId: string, updatedOrder: Order): Observable<Order> {
    //build formData because of image uploading
    const postData = new FormData();
    console.log(updatedOrder);
    if(updatedOrder.imageFile)
      postData.append('imageFile', updatedOrder.imageFile, updatedOrder.imageName);
    postData.append('senderName', updatedOrder.senderName);
    postData.append('senderPhone', updatedOrder.senderPhone);
    postData.append('senderEmail', updatedOrder.senderEmail);
    postData.append('senderAddress', updatedOrder.senderAddress);
    postData.append('receiverName', updatedOrder.receiverName);
    postData.append('receiverPhone', updatedOrder.receiverPhone);
    postData.append('receiverEmail', updatedOrder.receiverEmail);
    postData.append('receiverAddress', updatedOrder.receiverAddress);
      //define fo routes //
    postData.append('cost', updatedOrder.cost.toString());
    postData.append('size', updatedOrder.size);
    postData.append('orderValue', updatedOrder.orderValue.toString());
    postData.append('tax', updatedOrder.tax.toString());
    postData.append('total', updatedOrder.total.toString());
    postData.append('weight', updatedOrder.weight.toString());
    postData.append('insurance', updatedOrder.insurance.toString());
    postData.append('orderDate', updatedOrder.orderDate.toString());
    postData.append('note', updatedOrder.note);
    postData.append('routes', JSON.stringify(updatedOrder.routes));

    return this.http.post<Order>(`${environment.backendUrl}/orders/${orderId}`, postData);
  }
  //for public delivery
  public getOrderById(_id: string): Observable<Order> {
    return this.http.get<Order>(`${environment.backendUrl}/orders/delivery/${_id}`);
  }

  //warehouses/nearest-search
  public getNearestWareHouse(query: string): Observable<Array<Warehouse>> {
    //query += query + `&lat=`;
    return this.http.get<Array<Warehouse>>(`${environment.backendUrl}/warehouses/nearest-search?${query}`);
  }

  public deleteOrderById(order_id: string): Observable<any> {
    return this.http.delete<any>(`${environment.backendUrl}/orders/${order_id}`);
  }
}

