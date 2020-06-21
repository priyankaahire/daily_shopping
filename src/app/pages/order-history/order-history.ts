import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController } from '@ionic/angular';
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
    private alertCtrl: AlertController,
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
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(order)
      }
    }
    this.router.navigate(['order-details'], navigationExtras)
  }

  async cancelOrder(order) {
    const alert = await this.alertCtrl.create({
      header: "Cancel order?",
      message: "Do you really want to cancel the order?",
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        }, {
          text: 'Yes',
          handler: () => {
            this.cancelOrderApiCall(order['_id'])
          }
        }
      ]
    })
    await alert.present();
  }

  cancelOrderApiCall(order_id) {
    this.apiService.updateOrderStatus({
      order_id: order_id,
      status: "4"
    }).then(res => {
      this.getData()
    }).catch(err => {
      this._global.presentNetworkToast(err)
    })
  }
}
