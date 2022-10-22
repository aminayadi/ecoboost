import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { BecomecoboostModule } from '../becom-ecoboost/becomecoboost.module';
import { ProductService } from './services/product.service';

@NgModule({

  declarations: [
    ProductComponent,
    DetailProductComponent
  ],

  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    BecomecoboostModule,

  ],
  providers:[ProductService]
})

export class ProductModule {}
