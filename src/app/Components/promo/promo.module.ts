import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoRoutingModule } from './promo-routing.module';
import { PromoComponent } from './promo.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';
import { BecomecoboostModule } from '../becom-ecoboost/becomecoboost.module';


@NgModule({
  declarations: [
    PromoComponent
  ],
  imports: [
    CommonModule,
    PromoRoutingModule,
    SharedModule,
    BecomecoboostModule,
  ]
})
export class PromoModule { }
