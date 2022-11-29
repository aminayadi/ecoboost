import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodaySalesRoutingModule } from './today-sales-routing.module';
import { TodaySalesComponent } from './today-sales/today-sales.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';


@NgModule({
  declarations: [
    TodaySalesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodaySalesRoutingModule,
  ]
})
export class TodaySalesModule { }
