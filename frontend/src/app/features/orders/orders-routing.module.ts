import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { OrderCreateComponent } from './order-create/order-create.component';

import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: OrderListComponent },
      { path: 'create', component: OrderCreateComponent },
      { path: 'view/:id', component: OrderCreateComponent },
      { path: 'edit/:id', component: OrderCreateComponent },
      { path: 'delete/:id', component: OrderListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
