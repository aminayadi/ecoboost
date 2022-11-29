import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../../Shared/modules/not-found/notfound.component';
import { ContactComponent } from './contact.component';

const routes: Routes = [

  { path:'', component:ContactComponent },
  { path:'**', component:NotfoundComponent },

];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})

export class ContactRoutingModule { }
