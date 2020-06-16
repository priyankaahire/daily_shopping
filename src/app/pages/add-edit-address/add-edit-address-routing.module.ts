import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditAddressPage } from './add-edit-address.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditAddressPageRoutingModule {}
