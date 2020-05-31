import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.html',
  styleUrls: ['./mycart.scss'],
})
export class MycartPage implements OnInit {
  cart_items: any = []
  total = 0
  constructor(private activeRoute: ActivatedRoute,private router: Router ) { 
    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.item) {
        this.cart_items.push(JSON.parse(params.item));
        this.itemsChanged();
      }
    });
  }

  ngOnInit() {
  }
  payNow() {

    let navigationExtras = {
      queryParams: {
        item: JSON.stringify(this.cart_items),
      }
    };
      this.router.navigate(['checkout'],navigationExtras);
 //   this.router.navigate(['/checkout'])
  }
  back() {
    this.router.navigate(['/deal-of-day'])
  }
  itemsChanged() {
    this.total = 0
    this.cart_items.forEach((elt, index) => {
      this.total += elt['count'] * parseInt(elt['price'])
      this.cart_items[index].total = this.total;
    });
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
