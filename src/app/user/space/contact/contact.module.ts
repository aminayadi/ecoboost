import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { SharedModule } from 'src/app/Shared/modules/shared.module';
import { ContactComponent } from './contact/contact.component';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    NgxCaptchaModule,
    SharedModule
  ]
})
export class ContactModule { }
