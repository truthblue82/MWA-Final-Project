import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as reducer from './reducer';
import { OrderEffects } from './order/order.effect';

@NgModule({
  imports: [
    StoreModule.forRoot(reducer.fromOrder.reducer),
    EffectsModule.forRoot([ OrderEffects])
  ],
  exports: [StoreModule]
})
export class StorageModule { }