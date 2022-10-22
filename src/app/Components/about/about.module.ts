import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';
import { BecomecoboostModule } from '../becom-ecoboost/becomecoboost.module';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AboutRoutingModule,
    BecomecoboostModule
  ]
})
export class AboutModule { }
