import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { OrderEffects } from './order.effect';
import { ORDER_FEATURE_KEY, reducer } from './order.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ORDER_FEATURE_KEY, reducer),
    EffectsModule.forFeature([OrderEffects]),
  ],
})
export class OrderFeatureStoreModule {}