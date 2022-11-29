import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllProductRoutingModule } from './all-product-routing.module';
import { AllProductsComponent } from './all-products/all-products.component';


@NgModule({
  declarations: [
    AllProductsComponent
  ],
  imports: [
    CommonModule,
    AllProductRoutingModule
  ]
})
export class AllProductModule { }
