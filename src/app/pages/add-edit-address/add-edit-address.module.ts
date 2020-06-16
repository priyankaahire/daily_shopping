import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditAddressPageRoutingModule } from './add-edit-address-routing.module';

import { AddEditAddressPage } from './add-edit-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditAddressPageRoutingModule
  ],
  declarations: [AddEditAddressPage]
})
export class AddEditAddressPageModule {}
