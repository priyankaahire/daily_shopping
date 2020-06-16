import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.html',
  styleUrls: ['./order-history.scss'],
})
export class OrderHistoryPage implements OnInit {

  items: any = [];
  constructor(private storage: Storage,private router: Router,
    private apiService: ApiService ) {
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.storage.get('user_id').then(res => {
      this.apiService.getOrderHistory({'user_id': res}).then(res => {
        this.items = res
        console.log('items', this.items);
        
      })
    })
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
