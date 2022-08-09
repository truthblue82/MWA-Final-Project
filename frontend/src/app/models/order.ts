import { OrderRoute } from "./order-route";

export interface Order {
  _id: string;
  trackingNumber: string;
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  senderEmail: string;

  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverEmail: string;

  sourceAddress: string;
  orderDate: Date;
  cost: number;
  tax: number;
  weight: number;
  size: string;
  orderValue: number;
  insurance: boolean;
  images: string;
  imageFile: File;
  imageName: string;
  orderStatus: string;
  total: number;
  note: string;
  routes: OrderRoute[], //{from: {name: string, address: string, contact: string}, to: {name: string, address: string, contact: string}, routeStatus, assignee: {id, name}, note};
  orderCreator: {
    id: string;
    name: string;
  },
  /*routes: [
      {
        name: string,
        address: string,
        PIC: string,
        status: string
      }
  ]*/
}
// routes: [
//       {
//         name: string,
//         address: string,
//         PIC: string,
//         status: string
//       }
//     ]

