import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Order } from '../models/order';
import { OrderParams } from '../models/order-params';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { OrderResponse } from '../models/order-response';

@Injectable()
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  public getOrders(params: OrderParams): Observable<OrderResponse> {
    //return this.http.get<Array<Order>>('http://localhost:3000/orders');
    return of(this.getFakeCustomers(params)).pipe(delay(3000));
  }

  private getFakeCustomers(params: OrderParams): OrderResponse {
    let data = <Order[]>[];

    data = customers.filter(c => ~(c.role.toLocaleLowerCase()).indexOf(params.filter)
      || ~(c.firstName.toLocaleLowerCase()).indexOf(params.filter)
      || ~(c.lastName.toLocaleLowerCase()).indexOf(params.filter));  

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

const customers = <Order[]>[
  <Order>{
    id: "1",
    amount: 100,
    firstName: "Nikolai",
    lastName: "Uvarov",
    role: "Admin"
  },
  <Order>{
    id: "2",
    amount: 140,
    firstName: "John",
    lastName: "Conor",
    role: "Admin"
  },
  <Order>{
    id: "3",
    amount: 80,
    firstName: "Olya",
    lastName: "Bytsenko",
    role: "User"
  },
  <Order>{
    id: "4",
    amount: 100,
    firstName: "Vasya",
    lastName: "Pupkin",
    role: "Partner"
  },
  <Order>{
    id: "5",
    amount: 140,
    firstName: "Ivan",
    lastName: "Grozniy",
    role: "Admin"
  },
  <Order>{
    id: "6",
    amount: 80,
    firstName: "Svet",
    lastName: "Svetoslav",
    role: "User"
  },
  ,
  <Order>{
    id: "7",
    amount: 200,
    firstName: "Alex",
    lastName: "Great",
    role: "Partner"
  },
  <Order>{
    id: "8",
    amount: 40,
    firstName: "Kolya",
    lastName: "Smith",
    role: "User"
  },
  <Order>{
    id: "9",
    amount: 160,
    firstName: "Tolya",
    lastName: "Alikov",
    role: "User"
  }
];