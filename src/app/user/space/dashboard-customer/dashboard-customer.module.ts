import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardCustomerRoutingModule } from './dashboard-customer-routing.module';
import { CustomDashboardComponent } from './custom-dashboard/custom-dashboard.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';


@NgModule({
  declarations: [
    CustomDashboardComponent
  ],
  imports: [
    CommonModule,SharedModule,
    DashboardCustomerRoutingModule
  ]
})
export class DashboardCustomerModule { }
