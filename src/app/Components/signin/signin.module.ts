import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';


@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    SigninRoutingModule
  ],
  providers:[]
})
export class SigninModule { }
