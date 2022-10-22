import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Signin2RoutingModule } from './signin2-routing.module';
import { Signin2Component } from './signin2/signin2.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';


@NgModule({
  declarations: [
    Signin2Component
  ],
  imports: [
    SharedModule,
    CommonModule,
    Signin2RoutingModule
  ]
})
export class Signin2Module { }
