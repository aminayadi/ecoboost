import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpaceComponent } from './space.component';

const routes: Routes = [
  {
    path: '',
    component: SpaceComponent,
    children: [
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'delivery-dashboard',
        loadChildren: () =>
          import('./dashboard-delivery/dashboard-delivery.module').then((m) => m.DashboardDeliveryModule),
      },
      {
        path: 'customer-dashboard',
        loadChildren: () =>
          import('./dashboard-customer/dashboard-customer.module').then((m) => m.DashboardCustomerModule),
      },
      {
        path: 'purchase',
        loadChildren: () =>
          import('./purchase/purchase.module').then((m) => m.PurchaseModule),
      },
      {
        path: 'bonus',
        loadChildren: () =>
          import('./bonus/bonus.module').then((m) => m.BonusModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: 'claim',
        loadChildren: () =>
          import('./claim/claim.module').then((m) => m.ClaimModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaceRoutingModule {}
