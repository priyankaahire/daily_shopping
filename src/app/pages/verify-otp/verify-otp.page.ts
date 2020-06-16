import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobalService } from 'src/app/services/app-global.service';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
})
export class VerifyOtpPage implements OnInit {

  detail
  otp: string = ''
  loading

  constructor(private activeRoute: ActivatedRoute,
    private _global: AppGlobalService,
    private apiService: ApiService,
    private router: Router,
    private storage: Storage,
    private loadingCtrl: LoadingController) {
    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.item) {
        this.detail = JSON.parse(params.item);
      }
    });
  }

  ngOnInit() {
  }

  async verify() {
    if(this.otp === '') {
      this._global.presentNetworkToast('Please enter OTP')
      return
    }
    if(this.otp.toString() !== this.detail.otp) {
      this._global.presentNetworkToast('OTP is not valid')
      return
    }
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();
    let params = {
      mobile_no: this.detail.mobile_no,
      name: this.detail.name,
      email_id: this.detail.email
    }
    console.log('param', params);
    
    this.apiService.signup(params).then(res=> {
      this.storage.set('user_id', res['_id']).then(res => {
        this.storage.set('loggedin', 'true').then(res => {
          this.dismissLoading()
          this.router.navigate(['tabs', 'home'])
        })
      })
    }).catch(err => {
      this.dismissLoading()
      this._global.presentNetworkToast(err)
    })

  }

  async dismissLoading() {
    await this.loading.dismiss()
  }
}
