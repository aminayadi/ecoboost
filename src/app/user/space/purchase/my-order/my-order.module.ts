import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrderRoutingModule } from './my-order-routing.module';
import { MyorderComponent } from './myorder/myorder.component';


@NgModule({
  declarations: [
    MyorderComponent
  ],
  imports: [
    CommonModule,
    MyOrderRoutingModule
  ]
})
export class MyOrderModule { }
