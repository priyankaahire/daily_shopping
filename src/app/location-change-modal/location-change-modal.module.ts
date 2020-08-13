import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationChangeModalComponent } from './location-change-modal.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [ CommonModule, FormsModule, IonicModule],
    declarations: [LocationChangeModalComponent],
    exports: [LocationChangeModalComponent]
  })
  export class LocationChangeModalComponentModule {}