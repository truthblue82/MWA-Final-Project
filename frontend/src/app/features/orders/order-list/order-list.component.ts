import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from "@angular/core";
import { Order } from "src/app/models/order";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { GlobalState } from "src/app/store/states/global.state";
import { Store, select } from "@ngrx/store";
import {
  selectAllOrder,
  selectOrderTotal,
  selectOrderError,
  selectOrderLoading,
} from "src/app/store/selectors/order.selectors";
import {
  loadingOrders,
  deleteOrder
} from "src/app/store/actions/order.actions";
import { MatPaginator } from "@angular/material/paginator";
import { Observable, merge, Subject, Subscription } from "rxjs";
import { tap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ThisReceiver } from "@angular/compiler";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"],
})
export class OrderListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  public displayedColumns: string[] = [
    "id",
    "senderName",
    "senderPhone",
    "receiverName",
    "receiverPhone",
    "actions"
  ];
  public dataSource!: MatTableDataSource<Order>;
  public orderTotal!: number;
  public noData: Order[] = [<Order>{}];
  public loading!: boolean;
  public error$!: Observable<boolean>;
  public filterSubject = new Subject<string>();
  public defaultSort: Sort = { active: "role", direction: "asc" };
  
  private filter: string = "";
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, public dialog: MatDialog, public store: Store<GlobalState>) {}

  public ngOnInit(): void {
    this.store
      .pipe(select(selectAllOrder))
      .subscribe((orders) => this.initializeData(orders));
    this.store
      .pipe(select(selectOrderTotal))
      .subscribe((total) => (this.orderTotal = total));
    this.subscription.add(
      this.store.pipe(select(selectOrderLoading)).subscribe((loading) => {
        if (loading) {
          this.dataSource = new MatTableDataSource(this.noData);
        }
        this.loading = loading;
      })
    );
    this.error$ = this.store.pipe(select(selectOrderError));
  }

  public ngAfterViewInit(): void {
    this.loadOrders();
    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      })
    );

    let sort$ = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 0))
    );

    this.subscription.add(
      merge(filter$, sort$, this.paginator.page)
        .pipe(tap(() => this.loadOrders()))
        .subscribe()
    );
  }

  private loadOrders(): void {
    this.store.dispatch(
      loadingOrders({
        params: {
          filter: this.filter.toLocaleLowerCase(),
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize,
          sortDirection: this.sort.direction,
          sortField: this.sort.active,
        },
      })
    );
  }

  private initializeData(orders: Order[]): void {
    this.dataSource = new MatTableDataSource(
      orders.length ? orders : this.noData
    );
  }

  OnEditBtn(id: string): void {
    this.router.navigate([`/orders/edit/${id}`]);
  }

  OnViewBtn(id: string): void {
    this.router.navigate([`/orders/view/${id}`]);
  }

  OnDeleteBtn(id: string): void {
    let delConfirmationDialog = this.dialog.open(
      ConfirmDialogComponent, 
      {
        data: {
          title: 'Delete Order', 
          message: `Are you sure you want to delete order ${id}?`
        }
      });
    delConfirmationDialog.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteOrder({ _id: id }));
        this.router.navigate(['/']);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public retry(): void {
    this.loadOrders();
  }
}
