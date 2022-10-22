import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        data: { pageTitle: 'Products' },
        loadChildren: () => import('./productdb/product/product.module').then(m => m.ProductdbProductModule),
      },
      {
        path: 'cart',
        data: { pageTitle: 'Carts' },
        loadChildren: () => import('./cartdb/cart/cart.module').then(m => m.CartdbCartModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
