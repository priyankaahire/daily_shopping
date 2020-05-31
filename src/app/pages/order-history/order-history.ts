import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.html',
  styleUrls: ['./order-history.scss'],
})
export class OrderHistoryPage implements OnInit {

  items: any = [];
  constructor(private activeRoute: ActivatedRoute,private router: Router ) { 
    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.item) {
        this.items = JSON.parse(params.item);
      }
    });
  }

  ngOnInit() {
  }
  dealOfTheDay(){
    this.router.navigate(['/deal-of-day'])
  }
  backtohome(){
    this.router.navigate(['/home'])
  }
  back() {
    this.router.navigate(['/checkout'])
  }
}
