import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AppGlobalService } from 'src/app/services/app-global.service';
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.html',
  styleUrls: ['./mycart.scss'],
})
export class MycartPage implements OnInit {
  cart_items: any = []
  total = 0
  constructor(private storage: Storage,
    private router: Router,
    private _global: AppGlobalService) { 
  }

  ionViewDidEnter() {
    this.storage.get('cart').then(res => {
      this.cart_items = JSON.parse(res)
      console.log('my cart', this.cart_items);
      
      this.itemsChanged()
    })
  }

  ngOnInit() {
  }
  payNow() {
    if(this.cart_items == null || this.cart_items.length == 0) {
      this._global.presentNetworkToast('Cart is empty')
      return
    }
    this.storage.set('cart', JSON.stringify(this.cart_items)).then(res => {

      this.router.navigate(['checkout'])
    })
  }
  back() {
    // this.router.navigate(['/deal-of-day'])
  }
  itemsChanged() {
    this.total = 0
    this.cart_items.forEach((elt, index) => {
      this.total += elt['count'] * parseInt(elt['price'])
      this.cart_items[index].total = this.total;
    });
    this.storage.set('cart', JSON.stringify(this.cart_items)).then(res => {
    })
  }

  deleteFromCart(idx) {
    this.cart_items.splice(idx, 1)
    this.itemsChanged();
  }
  plus(idx, event:Event) {
    event.stopPropagation();
    if(this.cart_items[idx].count != 10) {
      this.cart_items[idx].count += 1;
      this.itemsChanged();
    }
  }

  minus(idx,event:Event) {
    event.stopPropagation();
    if(this.cart_items[idx].count != 0) {
      this.cart_items[idx].count -= 1;
      this.itemsChanged();
    }
  }
}
