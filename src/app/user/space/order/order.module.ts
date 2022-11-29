import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderTabComponent } from './order-tab/order-tab.component';
import { ClientOrderComponent } from './client-order/client-order.component';
import { ClientPendingOrderComponent } from './client-pending-order/client-pending-order.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';


@NgModule({
  declarations: [
    OrderTabComponent,
    ClientOrderComponent,
    ClientPendingOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
