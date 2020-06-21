import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('one') inputOne;
  @ViewChild('two') inputTwo;
  @ViewChild('three') inputThree;
  @ViewChild('four') inputFour;
  @ViewChild('five') inputFive;
  @ViewChild('six') inputSix;

  detail
  loading
  otp1: string = ''
  otp2: string = ''
  otp3: string = ''
  otp4: string = ''
  otp5: string = ''
  otp6: string = ''

  constructor(private activeRoute: ActivatedRoute,
    private _global: AppGlobalService,
    private apiService: ApiService,
    private router: Router,
    private storage: Storage,
    private loadingCtrl: LoadingController) {
    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.item) {
        this.detail = JSON.parse(params.item);
        console.log('detail', this.detail);
        
      }
    });
  }

  ngOnInit() {
  }

  async verify() {
    let enteredOtp = this.otp1.toString() + this.otp2.toString() + this.otp3.toString()
                       + this.otp4.toString() + this.otp5.toString() + this.otp6.toString();
    
    if(enteredOtp === '') {
      this._global.presentNetworkToast('Please enter OTP')
      return
    }
    if(enteredOtp !== this.detail.otp) {
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
      this.storage.set('user', JSON.stringify(params))
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

  inputChanged(id) {
    switch(id) {
      case "1":
        this.inputTwo.setFocus()
        break;
      case "2":
        this.inputThree.setFocus()
        break;
      case "3":
        this.inputFour.setFocus()
        break;
      case "4":
        this.inputFive.setFocus()
        break;
      case "5":
        this.inputSix.setFocus()
        break;
    }
  }
}
