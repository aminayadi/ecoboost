import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceRoutingModule } from './space-routing.module';
import { SpaceComponent } from './space.component';
import { SettingComponent } from './setting/setting.component';
import { MenuComponent } from './menu/menu.component';
import { CardPersoComponent } from './card-perso/card-perso.component';
import { SharedModule } from 'src/app/Shared/modules/shared.module';


@NgModule({
  declarations: [
    SpaceComponent,
    SettingComponent,
    MenuComponent,
    CardPersoComponent,
  ],
  imports: [

    CommonModule,
    SpaceRoutingModule,
    SharedModule,

  ]

})
export class SpaceModule { }
