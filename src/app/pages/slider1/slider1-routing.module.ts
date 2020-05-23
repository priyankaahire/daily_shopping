import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Slider1Page } from './slider1';

const routes: Routes = [
  {
    path: '',
    component: Slider1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Slider1PageRoutingModule {}
