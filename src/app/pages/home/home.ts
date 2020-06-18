import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AppGlobalService } from 'src/app/services/app-global.service';
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
  categories: any = [];
  imageSlider: any = []
  recentOrders: any = [];
  recommItems: any = [];
  loading
  loaded_cat = false
  loaded_orders = false
  constructor(private router: Router,
    private apiService: ApiService,
    public _global: AppGlobalService,
    private loadingCtrl: LoadingController) {
      
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
    this.apiService.getFeaturedProducts().then(res => {
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

}
