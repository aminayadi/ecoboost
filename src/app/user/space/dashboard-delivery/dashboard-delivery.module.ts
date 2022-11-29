import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardDeliveryRoutingModule } from './dashboard-delivery-routing.module';
import { DashboardDeliveryComponent } from './dashboard-delivery.component';
import { sha1 } from '@angular/compiler/src/i18n/digest';
import { SharedModule } from 'src/app/Shared/modules/shared.module';

@NgModule({
  declarations: [DashboardDeliveryComponent],
  imports: [CommonModule, DashboardDeliveryRoutingModule, SharedModule],
})
export class DashboardDeliveryModule {}
