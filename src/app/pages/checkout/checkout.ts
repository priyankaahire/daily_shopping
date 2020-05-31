import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss'],
})
export class CheckoutPage implements OnInit {
  items: any = []
  total = 0
  constructor(private activeRoute: ActivatedRoute,private router: Router ) { 
    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.item) {
        this.items.push(JSON.parse(params.item));
        this.total = params.total;
        console.log(this.items);
      }
    });
  }

  ngOnInit() {
  }
  back() {
    this.router.navigate(['/mycart']);
  }
  conform() {
    this.router.navigate(['/order-history']);
  }
  addToCart() {
    this.router.navigate(['/mycart'])
  }
  onSlideChanged(e) {
    console.log('On slide change event');
  }

  onSlideChangeStart(event) {
    /** isEnd true when slides reach at end slide */
    event.target.isEnd().then(isEnd => {
      console.log('End of slide', isEnd);
    });
  }
}
