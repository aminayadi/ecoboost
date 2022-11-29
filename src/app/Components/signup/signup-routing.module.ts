import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../../Shared/modules/not-found/notfound.component';
import { SignupComponent } from './signup.component';

const routes: Routes = [
  {path:'', component:SignupComponent},
  {path:'**', component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
