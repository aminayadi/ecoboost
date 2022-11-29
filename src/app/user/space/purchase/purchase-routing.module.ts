import { NotfoundComponent } from '../../../Shared/modules/not-found/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'my-order',
    loadChildren: () =>
      import('./my-order/my-order.module').then((m) => m.MyOrderModule),
  },
  {
    path: 'my-inventory',
    loadChildren: () =>
      import('./my-inventory/my-inventory.module').then( (m) => m.MyInventoryModule),
  },
  {
    path: 'all-products',
    loadChildren: () =>
      import('./all-products/all-product.module').then( (m) => m.AllProductModule),
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseRoutingModule {}
