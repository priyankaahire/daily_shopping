import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Slider1PageRoutingModule } from './slider1-routing.module';

import { Slider1Page } from './slider1';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Slider1PageRoutingModule
  ],
  declarations: [Slider1Page]
})
export class Slider1PageModule {}
