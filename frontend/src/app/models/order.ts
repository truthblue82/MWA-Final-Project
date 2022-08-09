import { OrderRoute } from "./order-route";

export interface Order {
  _id: string;
  senderName: string;
  senderPhone: string;
  senderAddress: string;

  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;

  sourceAddress: string;
  orderDate: Date;
  cost: number;
  weight: number;
  size: number;
  orderValue: number;
  insurance: boolean;
  images: [string, string];
  orderStatus: string;
  total: number;
  note: string;
  routes: OrderRoute[], //{from: {name: string, address: string, contact: string}, to: {name: string, address: string, contact: string}, routeStatus, assignee: {id, name}, note};
  orderCreator: {
    id: string;
    name: string;
  }
}

// route: [{
    //     name: string,
    //     contact_point: string,
    //     address: string,
    //     phone: string
    // }]
