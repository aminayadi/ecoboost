import { NotfoundComponent } from '../../../Shared/modules/not-found/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BonusComponent } from './bonus/bonus.component';

const routes: Routes = [
  {
    path: 'bonus-tracking',
    component: BonusComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BonusRoutingModule {}
