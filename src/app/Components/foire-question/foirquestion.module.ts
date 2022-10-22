import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoirquestionRoutingModule } from './foirquestion-routing.module';
import { FoirquestionComponent } from './foirquestion.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';
import { BecomecoboostModule } from '../becom-ecoboost/becomecoboost.module';

@NgModule({
  declarations: [FoirquestionComponent],
  imports: [
    SharedModule,
    CommonModule,
    FoirquestionRoutingModule,
    BecomecoboostModule,
  ],
})
export class FoirquestionModule {



}
