import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Slider3PageRoutingModule } from './slider3-routing.module';

import { Slider3Page } from './slider3';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Slider3PageRoutingModule
  ],
  declarations: [Slider3Page]
})
export class Slider3PageModule {}
