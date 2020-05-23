import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealOfDayPage } from './deal-of-day';

const routes: Routes = [
  {
    path: '',
    component: DealOfDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealOfDayPageRoutingModule {}
