import { NotfoundComponent } from '../../Shared/modules/not-found/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Signin2Component } from './signin2/signin2.component';

const routes: Routes = [
  { path: '', component: Signin2Component },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Signin2RoutingModule {}
