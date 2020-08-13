import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage';
import { AppGlobalService } from 'src/app/services/app-global.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {

  addresses
  user_id
  loading

  constructor(
    private router: Router,
    private apiService: ApiService,
    private storage: Storage,
    private _global: AppGlobalService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {
    this.storage.get('user_id').then(res => {
      this.user_id = res
      this.getAddresses()
    })
  }

  ionViewDidEnter() {
    this.getAddresses()
  }

  async getAddresses() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();
    this.apiService.getAddresses({
      user_id: this.user_id
    }).then(res => {
      this.addresses = res
      this.dismissLoading()
    }).catch(err => {
      this._global.presentNetworkToast(err)
      this.dismissLoading()
    })
  }

  async dismissLoading() {
    await this.loading.dismiss()
  }

  ngOnInit() {
  }

  edit(address) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        item: JSON.stringify(address)
      }
    }
    this.router.navigate(['add-edit-address'], navigationExtras)
  }

  async delete(address) {
    const alert = await this.alertCtrl.create({
      header: "Confirm delete?",
      message: "Do you really want to delete this address?",
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        }, {
          text: 'Yes',
          handler: () => {
            this.deleteAddress(address)
          }
        }
      ]
    })
    await alert.present();
  }

  deleteAddress(address) {
    this.apiService.deleteAddress({
      address_id: address['address_id']
    }).then(res => {
      this.getAddresses()
    }).catch(err => {
      this._global.presentNetworkToast(err)
    })
  }

  addAddress() {
    this.router.navigate(['add-edit-address'])
  }

  back() {
    this.navCtrl.back()
  }

}
