import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ],
  declarations: [
    OrderListComponent
  ],
  entryComponents: [
  ]
})
export class OrdersModule { }
