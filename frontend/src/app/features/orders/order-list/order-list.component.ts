import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Order } from '../../../models/order.model';
import { State } from "../../../store/reducer";
import { Store, select } from "@ngrx/store";
import { selectAllOrders } from "../../../store/order/order.selector";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'sender_name', 'receiver_name', 'receiver_phone'];
  dataSource!: MatTableDataSource<Order>;
  noData: Order[] = [<Order>{}];

  // @ViewChild(MatSort, { static: true })
  // sort: MatSort = new MatSort;

  constructor(
    private notificationService: NotificationService,
    private titleService: Title,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.titleService.setTitle('angular-material-template - Customers');
    this.notificationService.openSnackBar('Orders loaded');
    //this.dataSource.sort = this.sort;
    console.log(">>>>>>");
    this.store
      .pipe(select(selectAllOrders))
      .subscribe((orders) => this.initializeData(orders));
  }

  private initializeData(orders: Order[]): void {
    console.log("11111111111", orders);
    this.dataSource = new MatTableDataSource(
      orders.length ? orders : this.noData
    );
  }
}
