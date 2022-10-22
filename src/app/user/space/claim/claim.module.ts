import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim/claim.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';


@NgModule({
  declarations: [
    ClaimComponent
  ],
  imports: [
    CommonModule,
    ClaimRoutingModule,
    SharedModule

  ]
})
export class ClaimModule { }
