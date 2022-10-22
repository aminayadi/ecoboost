import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    ContactComponent
  ],
  
  imports: [
    CommonModule,
    SharedModule,
    ContactRoutingModule,
    NgxCaptchaModule,
  ],
  providers: []
})
export class ContactModule { }
