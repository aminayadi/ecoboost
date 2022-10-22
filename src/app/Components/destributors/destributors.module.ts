import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DestributorsRoutingModule } from './destributors-routing.module';
import { DestributorsComponent } from './destributors.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';


@NgModule({
  declarations: [
    DestributorsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DestributorsRoutingModule
  ]
})
export class DestributorsModule { }
