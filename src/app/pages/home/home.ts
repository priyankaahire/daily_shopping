import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AppGlobalService } from 'src/app/services/app-global.service';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('mySlider') slider: IonSlides;
  options
  items
  recent

  left_border = {
    'border-left': '1px solid gainsboro'
  }

  right_border = {
    'border-right': '1px solid gainsboro'
  }

  top_border = {
    'border-top': '1px solid gainsboro',
  }

  bottom_border = {
    'border-bottom': '1px solid gainsboro'
  }

  categories: any = [];
  imageSlider: any = []
  recentOrders: any = [];
  recommItems: any = [];
  loading
  loaded_cat = false
  loaded_orders = false

  // Readable Address
  address: string;
  location: string = ''

  // Location coordinates
  latitude: number;
  longitude: number;
  accuracy: number;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  
  constructor(private router: Router,
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private apiService: ApiService,
    public _global: AppGlobalService,
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
      this.requestGPSPermission();
      this.goToTabWithId();
      // this.getCategories();
      // this.getRecentOrders();
      this.getImageSlider();
      this.getData()
  }

  async getData() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();
    setInterval(function() {
        if(this.loaded_cat && this.loaded_orders) {
          this.dismissLoading()
        }
    }, 1000)
    this.getCategories();
    this.getRecentOrders();
  }

  getBorder(idx) {
    let border = {}
    if((idx + 1) % 3 == 2) {
      border = {
        ...border,
        ...this.left_border,
        ...this.right_border
      }
    }
    if((idx + 1) / 3 == 1) {
      border = {
        ...border,
        ...this.bottom_border
      }
    }
    if((idx + 1) / 3 > 1) {
      border = {
        ...border,
        ...this.top_border
      }
    }
    return border
  }

  search() {
    this.router.navigate(['search'])
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: "Logout?",
      message: "Do you really want to logout?",
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        }, {
          text: 'Yes',
          handler: () => {
            this.storage.clear()
            this.router.navigate([''])
          }
        }
      ]
    })
    await alert.present();
  }

  async dismissLoading() {
    await this.loading.dismiss()
  }

  goToTabWithId() {

  }
 
  ngOnInit() {
  }
  getImageSlider() {
      this.imageSlider = [
        {
          firstname: "ONION",
          lastname: "",
          imageUrl: "assets/imgs/Onion.jpg"
        },
        {
          firstname: "ONION",
          lastname: "",
          imageUrl: "assets/imgs/Onion.jpg"
        },
        {
          firstname: "ONION",
          lastname: "",
          imageUrl: "assets/imgs/Onion.jpg"
        },
        {
          firstname: "ONION",
          lastname: "",
          imageUrl: "assets/imgs/Onion.jpg"
        }
       
      ]
  }
  gotoItem(category) {
    // this.app.getRootNav().push(ItemsListPage, {category: category})
  }

  getRecentOrders() {
    this.apiService.getFeaturedProducts().then((res: []) => {
      this.recentOrders = res
      this.recommItems = res
      this.loaded_orders = true
    }).catch(err => {
      this.loaded_orders = true
      this._global.presentNetworkToast(err)
    })
  }

  getCategories() {
    this.apiService.getCategories().then(res=> {
      this.loaded_cat = true
      this.categories = res
    }).catch(err=> {
      this._global.presentNetworkToast(err)
      this.loaded_cat = true
    })
  }

  dealOfTheDay(category) {
    console.log('cat_id home', category._id);
    
    let navigationExtras = {
      queryParams: {
        cat_id: category._id
      }
    };
    this.router.navigate(['deal-of-day'], navigationExtras)
  }
  onSlideChanged(e) {
  }

  onSlideChangeStart(event) {
    /** isEnd true when slides reach at end slide */
    event.target.isEnd().then(isEnd => {
    });
  }
  goToDetails(item) {
    let navigationExtras = {
      queryParams: {
        item: JSON.stringify(item)
      }
    };
    this.router.navigate(['details'],navigationExtras)
  }

  requestGPSPermission(){
		this.locationAccuracy.canRequest().then((canRequest: boolean) => {
			if(canRequest) {
			  // the accuracy option will be ignored by iOS
			  this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
				() => {
					console.log('Request successful')
					this.getGeolocation()
				},
				error => {
					console.log('Error requesting location permissions', error)
				}
			  );
			} else {
				this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
					() => {
						console.log('Request successful')
						this.getGeolocation()
					},
					error => {
						console.log('Error requesting location permissions', error)
					}
				  );
			}
		  
		  });
  }
  
  getGeolocation(){
		this.geolocation.getCurrentPosition().then((resp) => {
			console.log(resp)
		  this.latitude = resp.coords.latitude;
		  this.longitude = resp.coords.longitude; 
      this.accuracy = resp.coords.accuracy; 
      let storageLatLong = {
        lat: resp.coords.latitude,
        long: resp.coords.longitude
      }
      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
			console.log("latitude:", this.latitude )
			console.log("longitude:", this.longitude)
		 }).catch((error) => {
		   alert('Error getting location'+ JSON.stringify(error));
		 });
    }

    getGeoencoder(latitude, longitude) {
      this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
        .then((result: NativeGeocoderResult[]) => {
          this.location = result[0]['locality']
        })
        .catch((error: any) => {
          alert('Error getting location' + JSON.stringify(error));
        });
    }

}
