import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientOrderComponent } from './client-order/client-order.component';
import { ClientPendingOrderComponent } from './client-pending-order/client-pending-order.component';
import { OrderTabComponent } from './order-tab/order-tab.component';

const routes: Routes = [
  {path: '', component: OrderTabComponent},
  {path: ':criteria', component: OrderTabComponent},
  {path: 'custom/order', component: ClientOrderComponent},
  {path: 'custom/pending-order', component: ClientPendingOrderComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
