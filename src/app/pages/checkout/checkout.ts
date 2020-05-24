import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss'],
})
export class CheckoutPage implements OnInit {

  constructor(private router: Router) { }

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
