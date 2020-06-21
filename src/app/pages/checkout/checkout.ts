import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage';
import { AppGlobalService } from 'src/app/services/app-global.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss'],
})
export class CheckoutPage implements OnInit {
  items: any = [];
  total = 0;
  addresses
  selected_address_id = ''
  delivery_type = ''
  item_data
  user_id = ''
  constructor(private activeRoute: ActivatedRoute,private router: Router,
    private apiService: ApiService,
    private _global: AppGlobalService,
    private storage: Storage) { 
    this.storage.get('user_id').then(res => {
      console.log('user_id', res);
      this.user_id = res
      this.apiService.getAddresses({
        user_id: res
      }).then((res1: []) => {
        console.log('addresses', res1);
        
        this.addresses = []
        res1.forEach((elt: {}) => {
          elt['checked'] = false
          this.addresses.push(elt)
        });
      }).catch(err => {
        this._global.presentNetworkToast(err)
      })
    })
  }

  ionViewDidEnter() {
    this.storage.get('cart').then(res => {
      this.items = JSON.parse(res)
      this.total = 0
      this.item_data = []
      this.items.forEach(elt => {
        this.total += elt['total']
        let data = {
          product_id: elt['_id'],
          quantity: elt['count'].toString(),
          price: elt['total'].toString(),
          comment: ""
        }
        this.item_data.push(data)
      });
    })
    this.apiService.getAddresses({
      user_id: this.user_id
    }).then((res1: []) => {
      console.log('addresses', res1);
      
      this.addresses = []
      res1.forEach((elt: {}) => {
        elt['checked'] = false
        this.addresses.push(elt)
      });
    }).catch(err => {
      this._global.presentNetworkToast(err)
    })
  }

  selectAddress(address_id) {
    console.log('address_id', address_id);
    this.selected_address_id = address_id
    this.addresses.forEach((elt: {}) => {
      elt['checked'] = address_id == elt['address_id']
    });
  }

  selectDeliveryType(type) {
    this.delivery_type = type
  }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['/mycart']);
  }
  confirm() {
    if(this.selected_address_id == '') {
      this._global.presentNetworkToast('Please select address')
      return
    }
    if(this.delivery_type == '') {
      this._global.presentNetworkToast('Please select delivery method')
      return
    }
    let data = {
      user_id: this.user_id,
      total_items: this.items.length.toString(),
      address_id: this.selected_address_id,
      total_price: this.total.toString(),
      order_type: "1",
      payment_status: "0",
      transaction_id: "0",
      shipping_type: this.delivery_type,
      item_data: JSON.stringify(this.item_data)
    }
    console.log('data', data);
    
    this.apiService.createOrder(data).then(res => {
      this._global.presentNetworkToast('Order successful!')
      this.router.navigate(['tabs', 'history'])
    }).catch(err => {
      this._global.presentNetworkToast(err)
    })
  }
  addToCart() {
    this.router.navigate(['/mycart'])
  }
  onSlideChanged(e) {
  }

  onSlideChangeStart(event) {
    /** isEnd true when slides reach at end slide */
    event.target.isEnd().then(isEnd => {
    });
  }

  goToAddresses() {
    this.router.navigate(['addresses'])
  }

  editAddress(address) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        item: JSON.stringify(address)
      }
    }
    this.router.navigate(['add-edit-address'], navigationExtras)
  }
}
