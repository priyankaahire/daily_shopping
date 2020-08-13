import { Component, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-location-change-modal',
  templateUrl: './location-change-modal.component.html',
  styleUrls: ['./location-change-modal.component.scss'],
})
export class LocationChangeModalComponent {

  autocompleteItems;
  autocomplete;

  latitude: number = 0;
  longitude: number = 0;
  geo: any

  locationSelected = false

  service = new google.maps.places.AutocompleteService();

  constructor(
    private modalCtrl: ModalController,
    public zone: NgZone,
  ) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  chooseItem(item: any) {
    this.geo = item;
    this.geoCode(this.geo);//convert Address to lat and long
  }

  updateSearch() {

    if (this.autocomplete.query == '' || this.locationSelected) {
     this.autocompleteItems = [];
     this.locationSelected = false
     return;
    }

    let me = this;
    this.service.getPlacePredictions({
    input: this.autocomplete.query
   }, (predictions, status) => {
     me.autocompleteItems = [];

   me.zone.run(() => {
     if (predictions != null) {
        predictions.forEach((prediction) => {
          me.autocompleteItems.push(prediction.description);
        });
       }
     });
   });
  }

  //convert Address string to lat and long
  geoCode(address:any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
    this.latitude = results[0].geometry.location.lat();
    this.longitude = results[0].geometry.location.lng();
    this.locationSelected = true
    this.autocomplete.query = results[0]['formatted_address']
   });

  }

  setLocation() {
    if(this.latitude != 0 && this.longitude != 0) {
      let storageLatLong = {
        lat: this.latitude,
        long: this.longitude
      }
      this.modalCtrl.dismiss({
        location: this.autocomplete.query,
        lat_lng: JSON.stringify(storageLatLong)
      });
    } else {
      this.modalCtrl.dismiss();
    }
  }

}
