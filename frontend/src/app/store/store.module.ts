import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { OrderFeatureStoreModule } from './order/order.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictStateImmutability: true,
          strictActionTypeUniqueness: true,
        },
      },
    ),
    EffectsModule.forRoot(),
    OrderFeatureStoreModule
  ],
})
export class AppStoreModule {}