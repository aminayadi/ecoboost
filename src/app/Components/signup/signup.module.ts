import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class SignupModule { }
