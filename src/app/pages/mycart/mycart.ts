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
      if (params && params.special) {
        this.cart_items.push(JSON.parse(params.special));
        console.log(this.cart_items);
      }
    });
  }

  ngOnInit() {
  }
  payNow() {
    this.router.navigate(['/checkout'])
  }
  back() {
    this.router.navigate(['/deal-of-day'])
  }
}
