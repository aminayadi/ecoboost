import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NotfoundModule } from 'src/app/Shared/modules/not-found/notfound.module';
import { NotificationModule } from './Shared-notification/notification/notification.module';

@NgModule({
  declarations: [],

  imports: [CommonModule, ReactiveFormsModule,NotfoundModule,NotificationModule],

  exports: [ ReactiveFormsModule,NotfoundModule,NotificationModule, CommonModule,],
})
export class SharedModule {}
