import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonusTrackingRoutingModule } from './bonus-tracking-routing.module';
import { SharedModule } from 'src/app/Shared/modules/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,SharedModule,
    BonusTrackingRoutingModule,
  ]
})
export class BonusTrackingModule { }
