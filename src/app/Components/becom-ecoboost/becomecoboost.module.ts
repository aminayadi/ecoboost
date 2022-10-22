import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomEcoboostComponent } from './becom-ecoboost.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';

@NgModule({
  declarations: [BecomEcoboostComponent],
  imports: [CommonModule, SharedModule],
  exports: [BecomEcoboostComponent],
})
export class BecomecoboostModule {}
