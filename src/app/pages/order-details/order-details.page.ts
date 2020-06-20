import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppGlobalService } from 'src/app/services/app-global.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  selected = "1"
  order
  orderDetails
  loading

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private loadingCtrl: LoadingController,
    public _global: AppGlobalService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.order = JSON.parse(params.data);
        this.getData()
      }
    });
  }

  ngOnInit() {
  }

  async getData() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();
    console.log('order_id', this.order['_id']);
    
    this.apiService.getOrderItems({'order_id': this.order['_id']}).then(res => {
      this.orderDetails = res
      console.log('details', this.orderDetails)
    })
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.selected = ev['detail']['value']
  }

}
