import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupdetailsPage } from './signupdetails';

const routes: Routes = [
  {
    path: '',
    component: SignupdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupdetailsPageRoutingModule {}
