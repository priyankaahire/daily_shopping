import { Component, OnInit } from '@angular/core';
import { AppGlobalService } from 'src/app/services/app-global.service';
import { ApiService } from 'src/app/services/api.service';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  q: string = ''
  items = []
  loading

  constructor(
    public _global: AppGlobalService,
    private apiService: ApiService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
    private toast: ToastController
  ) { }

  ngOnInit() {
  }

  async search() {
    if(this.q === '') {
      return
    }
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();
    let data = {
      keyword: this.q
    }
    this.apiService.searchProduct(data).then(res => {
      this.items = []
      res['data'].forEach((elt: {}) => {
        elt['count'] = 0
        this.items.push(elt)
      });
      this.dismissLoading()
    }).catch(err => {
      this._global.presentNetworkToast(err)
      this.dismissLoading()
    })
  }

  async dismissLoading() {
    await this.loading.dismiss()
  }

  back() {
    this.navCtrl.back()
  }

  addToCart(item, event:Event) {
    this.showToast()
    // event.stopPropagation();
    // console.log('cart item', item);
    
    // let navigationExtras2 = {
    //   queryParams: {
    //     item: JSON.stringify(item)
    //   }
    // };
    //   this.router.navigate(['mycart'],navigationExtras2)
  }

  async showToast() {
    const toastPresent = await this.toast.create({
      message: "Added to cart",
      duration: 300,
      position: 'bottom'
    })
    toastPresent.present();
  }

  gotoDetails(item) {
   let navigationExtras = {
    queryParams: {
      item: JSON.stringify(item)
    }
  };
    this.router.navigate(['details'],navigationExtras)
  }

  plus(idx, event:Event) {
    event.stopPropagation();
    if(this.items[idx].count != 10) {
      this.items[idx].count += 1;
     this.updateCart(this.items[idx])
    }
  }

  minus(idx,event:Event) {
    event.stopPropagation();
    if(this.items[idx].count != 0) {
      this.items[idx].count -= 1;
      this.updateCart(this.items[idx])
    }
  }

  updateCart(item) {
    this.storage.get('cart').then(res => {
      if(res == null) {
        this.storage.set('cart', JSON.stringify([item]))
      } else {
        let cart = JSON.parse(res)
        let exists = false
        cart.forEach(elt => {
          if(elt['_id'] === item['_id']) {
            exists = true
            elt['count'] = item['count']
          }
        });
        if(!exists) {
          cart.push(item)
        }
        this.storage.set('cart', JSON.stringify(cart))
      }
    })
  }
}
