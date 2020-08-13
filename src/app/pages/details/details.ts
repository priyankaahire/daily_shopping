import { Component, OnInit } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobalService } from 'src/app/services/app-global.service';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-details',
  templateUrl: './details.html',
  styleUrls: ['./details.scss'],
})
export class DetailsPage implements OnInit {
  sub:any;
  item:any = {};
  orderAgain: any = [];
  recommItems: any = [];
  count = 0
  constructor(private activeRoute: ActivatedRoute,private router: Router,
    public _global: AppGlobalService,
    private apiService: ApiService,
    private navCtrl: NavController,
    private storage: Storage) { 
    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.item) {
        this.item = JSON.parse(params.item);
        this.item['count'] = 0
      }
    });
  }
  ngOnInit() {
    this.getorderAgain();
  }
  addToCart(item) {
    event.stopPropagation();
      this.storage.get('cart').then(res => {
      
        if(res == null) {
          this.storage.set('cart', JSON.stringify([this.item])).then(() => {
            this.router.navigate(['mycart'])
          })
        } else {
          let cart = JSON.parse(res)
          let exists = false
          cart.forEach(elt => {
            if(elt['_id'] === item['_id']) {
              exists = true
              elt['count'] = item['count']
            }
          });
          if(!exists) {
            cart.push(item)
          }
          this.storage.set('cart', JSON.stringify(cart)).then(()=> {
            this.router.navigate(['mycart'])
          })
        }
      })
  }
  onSlideChanged(e) {
    console.log('On slide change event');
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
    });
  }
  back() {
    this.navCtrl.back()
    // this.router.navigate(['/deal-of-day'])
  }
  plus(event:Event) {
    if(this.count != 10) {
      this.count += 1;
    }
  }

  minus(event:Event) {
    if(this.count != 0) {
      this.count -= 1;
    }
  }
  getorderAgain() {
    this.apiService.getFeaturedProducts().then(res => {
      this.recommItems = res
      this.orderAgain = res
    }).catch(err => {
      this._global.presentNetworkToast(err)
    })
  }

  goToDetails(item) {
    let navigationExtras = {
      queryParams: {
        item: JSON.stringify(item)
      }
    };
    this.router.navigate(['details'],navigationExtras)
  }
}
