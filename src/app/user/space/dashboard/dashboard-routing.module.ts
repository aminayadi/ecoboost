import { NotfoundComponent } from '../../../Shared/modules/not-found/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodaySalesComponent } from './today-sales/today-sales/today-sales.component';

const routes: Routes = [

  { path: 'today-sales', component: TodaySalesComponent },
  { path: '**', component: NotfoundComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
