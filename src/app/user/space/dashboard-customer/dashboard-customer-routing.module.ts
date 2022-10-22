import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomDashboardComponent } from './custom-dashboard/custom-dashboard.component';

const routes: Routes = [  {
  path: '',
  component: CustomDashboardComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardCustomerRoutingModule { }
