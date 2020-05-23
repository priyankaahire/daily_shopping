import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Slider2Page } from './slider2';

const routes: Routes = [
  {
    path: '',
    component: Slider2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Slider2PageRoutingModule {}
