import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobalService } from 'src/app/services/app-global.service';
import { ApiService } from 'src/app/services/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss'],
})
export class SigninPage implements OnInit {
  mobile: string = ''
  name: string = ''
  email: string = ''

  loading

  constructor(private router: Router,
    private _global: AppGlobalService,
    private apiService: ApiService,
    private loadingCtrl: LoadingController) { }
  ngOnInit() {
  }
  async login() {
    if(this.mobile === '') {
      this._global.presentNetworkToast('Mobile number is required')
      return
    }
    if(this.name === '') {
      this._global.presentNetworkToast('Name is required')
      return
    }
    if(this.email === '') {
      this._global.presentNetworkToast('Email is required')
      return
    }
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();
    this.apiService.send_otp({
      mobile_no: this.mobile.toString()
    }).then(res => {
      console.log('res', res);
      let navigationExtras = {
        queryParams: {
          item: JSON.stringify({
            mobile_no: this.mobile.toString(),
            email: this.email,
            name: this.name,
            otp: res['data']['otp']
          })
        }
      }
      this.dismissLoading()
      this.router.navigate(['verify-otp'], navigationExtras)
    }).catch(err => {
      this.dismissLoading()
      this._global.presentNetworkToast(err)
    })
  }

  async dismissLoading() {
    await this.loading.dismiss()
  }

  signup() {
    this.router.navigate(['/signup'])
  }

}
