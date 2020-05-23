import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Slider3Page } from './slider3';

const routes: Routes = [
  {
    path: '',
    component: Slider3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Slider3PageRoutingModule {}
