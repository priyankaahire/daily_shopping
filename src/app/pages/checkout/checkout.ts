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
}
