import { QueryComponent } from './payment/query/query.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';
import { ProductService } from '../product/services/product.service';
import { CartService } from '../../Shared/services/cart.service';
import { RequestComponent } from './payment/request/request.component';
import { InitiateComponent } from './payment/initiate/initiate.component';
import { PaymentService } from './services/payment.service';

@NgModule({
  declarations: [
    CartComponent,
    QueryComponent,
    RequestComponent,
    InitiateComponent
  ],
  imports: [CommonModule, CartRoutingModule, SharedModule],
  providers: [ProductService,PaymentService],
})
export class CartModule {}
