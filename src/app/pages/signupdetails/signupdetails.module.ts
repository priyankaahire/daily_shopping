import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupdetailsPageRoutingModule } from './signupdetails-routing.module';

import { SignupdetailsPage } from './signupdetails';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupdetailsPageRoutingModule
  ],
  declarations: [SignupdetailsPage]
})
export class SignupdetailsPageModule {}
