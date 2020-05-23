import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Slider2PageRoutingModule } from './slider2-routing.module';

import { Slider2Page } from './slider2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Slider2PageRoutingModule
  ],
  declarations: [Slider2Page]
})
export class Slider2PageModule {}
