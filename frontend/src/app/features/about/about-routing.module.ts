import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ULayoutComponent } from '../../shared/ulayout/ulayout.component';
import { AboutPageComponent } from './about-page/about-page.component';

const routes: Routes = [
  {
    path: '',
    component: ULayoutComponent,
    children: [
      { path: ':order_id', component: AboutPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
