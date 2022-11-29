import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyInventoryRoutingModule } from './my-inventory-routing.module';
import { MyinventoryComponent } from './myinventory/myinventory.component';


@NgModule({
  declarations: [
    MyinventoryComponent
  ],
  imports: [
    CommonModule,
    MyInventoryRoutingModule
  ]
})
export class MyInventoryModule { }
