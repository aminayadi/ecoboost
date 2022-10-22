import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from 'src/app/Shared/modules/not-found/notfound.component';
import { CartComponent } from './cart/cart.component';
import { InitiateComponent } from './payment/initiate/initiate.component';
import { QueryComponent } from './payment/query/query.component';
import { RequestComponent } from './payment/request/request.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent
  },
  {
    path: 'initiate',
    component: InitiateComponent
  },
  {
    path: 'query',
    component: QueryComponent,
  },
  {
    path: 'request',
    component: RequestComponent,
  },
  { path: '**', component: NotfoundComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
