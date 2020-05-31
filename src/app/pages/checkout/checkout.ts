import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss'],
})
export class CheckoutPage implements OnInit {
  items: any = [];
  total = 0;
  constructor(private activeRoute: ActivatedRoute,private router: Router ) { 


    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.item) {
        this.items = JSON.parse(params.item);
      }
    });
  }

  ngOnInit() {
  }
  back() {
    this.router.navigate(['/mycart']);
  }
  conform() {
    let navigationExtras = {
      queryParams: {
        item: JSON.stringify(this.items)
      }
    }
    this.router.navigate(['order-history'], navigationExtras);
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
}
