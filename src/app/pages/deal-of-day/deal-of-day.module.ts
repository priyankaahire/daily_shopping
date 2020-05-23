import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DealOfDayPageRoutingModule } from './deal-of-day-routing.module';

import { DealOfDayPage } from './deal-of-day';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealOfDayPageRoutingModule
  ],
  declarations: [DealOfDayPage]
})
export class DealOfDayPageModule {}
