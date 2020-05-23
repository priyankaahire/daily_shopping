import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.html',
  styleUrls: ['./order-history.scss'],
})
export class OrderHistoryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  dealOfTheDay(){
    this.router.navigate(['/deal-of-day'])
  }
  backtohome(){
    this.router.navigate(['/home'])
  }
}
