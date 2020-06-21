import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { AppGlobalService } from './app-global.service';

@Injectable()
export class ApiService {

  BASE_URL = "https://deepmindssolutions.com/grocery_adit/api/index.php/api/"

  constructor(
    private http: HTTP,
    private _global: AppGlobalService
  ) { }

  login(data) {
    return this._callGetAPI('/login', data)
  }

  send_otp(data) {
    return this._callPostApi('/send_otp', data)
  }

  signup(data) {
    return this._callGetAPI('/register_user_by_number', data)
  }

  getCategories() {
    return this._callGetAPI('/get_categories', {})
  }

  getFeaturedProducts() {
    return this._callGetAPI('/get_featured_products', {})
  }

  getProductsByCategoryId(data) {
    return this._callGetAPI('/get_products_by_category_id', data)
  }

  getItems() {
    return this._callGetAPI('/get_items', {})
  }

  getAddresses(data) {
    return this._callGetAPI('/get_address', data)
  }

  forgotPassword(data) {
    return this._callGetAPI('/forget_password', data)
  }

  changePassword(data) {
    return new Promise((resolve, reject) => {
      this.http.get(this.BASE_URL + '/change_password', data, {})
        .then(res => {
          let jsonRes = JSON.parse(res.data)
          if(jsonRes.code === '200') {
            resolve(jsonRes.message)
          } else {
            reject(jsonRes.message)
          }
        }).catch(err => {
          if(err.status == -3) {
            // this._global.presentNetworkToast()
            reject('')
          }
          reject(JSON.stringify(err))
        })
    })
  }

  addAddress(data: any) {
    console.log('data', {
      'user_id': this._global.user_id,
      ...data
    });
    
    return this._callGetAPI('/add_address', {
      'user_id': this._global.user_id,
      ...data
    })
  }

  editAddress(data: any) {
    return this._callGetAPI('/edit_address', {
      'user_id': this._global.user_id,
      ...data
    })
  }

  deleteAddress(data: any) {
    return this._callGetAPI('/delete_address', data)
  }

  getStates() {
    return this._callGetAPI('/get_states', {})
  }

  getCities() {
    return this._callGetAPI('/get_city', {})
  }

  createOrder(data) {
    return this._callPostApi('/create_order', data)
  }

  getOrderHistory(data) {
    return this._callGetAPI('/get_order_history', data)
  }

  getOrderItems(data) {
    return this._callGetAPI('/get_order_items', data)
  }

  searchProduct(data) {
    return this._callPostApi('/search_products_by_keyword', data)
  }

  updateOrderStatus(data) {
    return this._callPostApi('/update_order_status', data)
  }

  getDeliveryBoyLocation(data) {
    return this._callGetAPI('/get_delivery_boy_location', data)
  }

  _callPostApi(url: string, params: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.BASE_URL + url, params, {})
        .then(res => {
          let jsonRes = JSON.parse(res.data)
          if(jsonRes.code === '200') {
            resolve(jsonRes)
          } else {
            reject(jsonRes.message)
          }
        }).catch(err => {
          if(err.status == -3) {
            // this._global.presentNetworkToast()
            reject('')
          }
          reject(JSON.stringify(err))
        })
    })
  }

  _callGetAPI(url: string, params: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.BASE_URL + url, params, {})
        .then(res => {
          let jsonRes = JSON.parse(res.data)
          if(jsonRes.code === '200') {
            resolve(jsonRes.data)
          } else {
            reject(jsonRes.message)
          }
        }).catch(err => {
          if(err.status == -3) {
            // this._global.presentNetworkToast()
            reject('')
          }
          reject(JSON.stringify(err))
        })
    })
  }
}

