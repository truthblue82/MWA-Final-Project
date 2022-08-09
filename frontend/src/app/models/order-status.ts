export interface OrderStatus {
  New: number;
  Processing: number;
  OnTheWay: number;
  Pending: number;
  Arrived: number;
  Delivered: number;
  Completed: number;
  Failed: number;
};
/*
	New: create a new order
	Processing: assign an operator for shipping
	On the way: shipping
	Pending: There are a reason for pending as plan
	Arrived: at the warehouse
	Delivered: to receiver
	Completed: Delivery success
	Failed: There are some reasons can't deliver to customer
*/
