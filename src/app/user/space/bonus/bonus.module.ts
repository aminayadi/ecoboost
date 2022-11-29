import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonusRoutingModule } from './bonus-routing.module';
import { BonusComponent } from './bonus/bonus.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';


@NgModule({
  declarations: [
    BonusComponent
  ],
  imports: [
    CommonModule,SharedModule,
    BonusRoutingModule
  ]
})
export class BonusModule { }
