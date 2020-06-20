import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { AppGlobalService } from 'src/app/services/app-global.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.html',
  styleUrls: ['./order-history.scss'],
})
export class OrderHistoryPage implements OnInit {

  items: any = [];
  loading
  constructor(private storage: Storage,private router: Router,
    private apiService: ApiService,
    private loadingCtrl: LoadingController,
    private _global: AppGlobalService) {
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.getData()
    
  }

  async getData() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();
    this.storage.get('user_id').then(res => {
      this.apiService.getOrderHistory({'user_id': res}).then(res => {
        this.items = res
        this.dismissLoading()
      })
    })
  }

  async dismissLoading() {
    await this.loading.dismiss()
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

  viewDetails(order) {
    this._global.presentNetworkToast('Coming soon...')
  }

  cancelOrder(order) {
    this._global.presentNetworkToast('Coming soon...')
  }
}
