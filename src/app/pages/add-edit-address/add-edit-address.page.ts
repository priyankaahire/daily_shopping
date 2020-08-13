import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AppGlobalService } from 'src/app/services/app-global.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps, GoogleMapOptions, Marker } from '@ionic-native/google-maps/ngx';
import { Platform, LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

declare var google: any;

@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.page.html',
  styleUrls: ['./add-edit-address.page.scss'],
})
export class AddEditAddressPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  title = 'Add Address'
  address: any = {}
  data: any = {
    title: '',
    address: '',
    locality: '',
    landmark: '',
    state_id: '',
    city_id: ''
  }

  action: string = "add"
  btn_text: string = "Add Address"

  state
  city

  states: any = []
  cities: any = []

  autocompleteItems;
  autocomplete;

  locMarker: Marker

  latitude: number = 0;
  longitude: number = 0;
  geo: any

  user_id
  loading

  service = new google.maps.places.AutocompleteService();

  constructor(private route: ActivatedRoute, private apiService: ApiService,
    private platform: Platform,
    private geolocation: Geolocation,
    public zone: NgZone,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private _global: AppGlobalService,
    private storage: Storage) {
      this.route.queryParams.subscribe(params => {
        if (params && params.item) {
          this.address = JSON.parse(params.item);
          this.title = 'Edit Address'
          this.action = 'edit'
          this.btn_text = 'Update Address'
        }
      });
      this.storage.get('user_id').then(res => {
        this.user_id = res
      })
    this.getStates()
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
    platform.ready().then(() => {
      this.initMap();
    });
  }

  async initMap() {
    const res = await this.geolocation.getCurrentPosition();
    let mapOptions: GoogleMapOptions = {
      mapType: 'MAP_TYPE_TERRAIN',
      camera: {
          target: {
            lat: res.coords.latitude,
            lng: res.coords.longitude
          },
          zoom: 15
      }
    }
    this.map = GoogleMaps.create('map', mapOptions);
  }

  chooseItem(item: any) {
    this.geo = item;
    this.geoCode(this.geo);//convert Address to lat and long
  }

  updateSearch(event: Event) {

    if (this.autocomplete.query == '') {
     this.autocompleteItems = [];
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
    this.autocomplete.query = results[0]['formatted_address']
    
    this.autocompleteItems = []
    if(this.locMarker!=null) {
      this.locMarker.remove()
    }
    this.locMarker = this.map.addMarkerSync({
      title: this.data['title'],
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: this.latitude,
        lng: this.longitude
      }
    })
    this.map.moveCamera({
      target: {
        lat: this.latitude,
        lng: this.longitude
      },
      zoom: 15
    })
   });

}

  async getStates() {
    await this.apiService.getStates().then(res => {
      this.states = res
      
      if(this.action == 'edit') {
        this.states.forEach(elt => {
          if(elt._id == this.address.state_id) {
            this.state = elt
            return
          }
        });
      }
    }).catch(err => {
      this._global.presentNetworkToast(err)
    })
    if(this.action == 'edit') {
      this.data.title = this.address.title
      this.data.locality = this.address.locality
      this.data.landmark = this.address.landmark
      this.data.pincode = this.address.pincode
      this.autocomplete.query = this.address.address
    }
  }

  async stateChanged() {
    await this.apiService.getCities({
      state_id: this.state._id
    }).then(res => {
      
      this.cities = res['data']
      if(this.action == 'edit') {
        this.cities.forEach(elt => {
          if(elt._id == this.address.city_id) {
            this.city = elt
            return
          }
        });
      }
    }).catch(err => {
      this._global.presentNetworkToast(err)
    })
  }

  async addEditAddress() {
    if(this.data.title == '') {
      this._global.presentNetworkToast('Title cannot be empty')
      return
    }
    if(this.data.locality == '') {
      this._global.presentNetworkToast('Locality cannot be empty')
      return
    }
    if(this.data.landmark == '') {
      this._global.presentNetworkToast('Landmark cannot be empty')
      return
    }
    if(this.data.pincode == '') {
      this._global.presentNetworkToast('Pincode cannot be empty')
      return
    }
    if(this.state == null) {
      this._global.presentNetworkToast('Please select state')
      return
    }
    if(this.city == null) {
      this._global.presentNetworkToast('Please select city')
      return
    }
    if(this.autocomplete.query == '') {
      this._global.presentNetworkToast('Address cannot be empty')
      return
    }
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();
    if(this.action == 'add') {
      this.apiService.addAddress({
        user_id: this.user_id,
        title: this.data.title,
        address: this.autocomplete.query,
        location: this.data.locality,
        latitude: this.latitude.toString(),
        longitude: this.longitude.toString(),
        city_id: this.city._id,
        state_id: this.state._id,
        pincode: this.data.pincode.toString(),
        landmark: this.data.landmark
      }).then(res => {
        this.dismissLoading()
        this._global.presentNetworkToast('Address added successfully.')
        this.back()
      }).catch(err => {
        this.dismissLoading()
        this._global.presentNetworkToast(err)
      })
    } else {
      let params = {
        user_id: this.user_id,
        title: this.data.title,
        address: this.autocomplete.query,
        location: this.data.locality,
        pincode: this.data.pincode.toString(),
        landmark: this.data.landmark,
        city_id: this.city._id,
        state_id: this.state._id,
        address_id: this.address.address_id
      }
      console.log('param', params);
      
      this.apiService.editAddress(params).then(res => {
        this.dismissLoading()
        this._global.presentNetworkToast('Address updated successfully.')
        this.back()
      }).catch(err => {
        this.dismissLoading()
        this._global.presentNetworkToast(err)
      })
    }
    
  }

  async dismissLoading() {
    await this.loading.dismiss()
  }

  ngOnInit() {
  }

  back() {
    this.navCtrl.back()
  }

}
