import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyinventoryComponent } from './myinventory/myinventory.component';

const routes: Routes = [
  {
    path: '',
    component: MyinventoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyInventoryRoutingModule {}
