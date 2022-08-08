import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderCreateComponent } from './order-create/order-create.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ],
  declarations: [
    OrderListComponent,
    OrderCreateComponent
  ],
  entryComponents: []
})
export class OrdersModule { }
