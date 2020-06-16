import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonSlide } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service';
import { NavController, NavParams } from '@ionic/angular';
import { AppGlobalService } from 'src/app/services/app-global.service';

@Component({
  selector: 'app-deal-of-day',
  templateUrl: './deal-of-day.html',
  styleUrls: ['./deal-of-day.scss'],
})
export class DealOfDayPage implements OnInit {
  categories:any = [];
  items:any = [];
  cat_id

  constructor(private router: Router, private route: ActivatedRoute,
    private storage: Storage,
    public _global: AppGlobalService,
    private apiService: ApiService) {
      this.route.queryParams.subscribe(params => {
        if (params && params.cat_id) {          
          this.cat_id = JSON.parse(params.cat_id);
          this.getProcucts()
        }
      });
      if(this.cat_id) {
        this.getProcucts()
      }
    this.getCategories();
  }

  getProcucts() {
    this.items = []
    this.apiService.getProductsByCategoryId({
      category_id: this.cat_id.toString()
    }).then((res: [])=> {
      this.items = []
      res.forEach((elt: {}) => {
        elt['count'] = 0
        this.items.push(elt)
      });
    }).catch(err=> {
      this._global.presentNetworkToast(err)
    })
  }

  selectCategory(id) {
    this.cat_id = id
    this.getProcucts()
  }

  ngOnInit() {
  }
  back() {
    this.router.navigate(['tabs', 'home']);
  }
  addToCart(item, event:Event) {
    event.stopPropagation();
    console.log('cart item', item);
    
    let navigationExtras2 = {
      queryParams: {
        item: JSON.stringify(item)
      }
    };
      this.router.navigate(['mycart'],navigationExtras2)
  }
  gotoDetails(item, event) {
   let navigationExtras = {
    queryParams: {
      item: JSON.stringify(item)
    }
  };
    this.router.navigate(['details'],navigationExtras)
  }
  onSlideChangeStart(event) {
    /** isEnd true when slides reach at end slide */
    event.target.isEnd().then(isEnd => {
    });
  }
  onSlideChanged(e) {
  }
  
  getCategories() {
    this.apiService.getCategories().then(res=> {
      this.categories = res
    }).catch(err=> {
      this._global.presentNetworkToast(err)
    })
  }

  plus(idx, event:Event) {
    event.stopPropagation();
    if(this.items[idx].count != 10) {
      this.items[idx].count += 1;
     this.updateCart(this.items[idx])
    }
  }

  minus(idx,event:Event) {
    event.stopPropagation();
    if(this.items[idx].count != 0) {
      this.items[idx].count -= 1;
      this.updateCart(this.items[idx])
    }
  }

  updateCart(item) {
    this.storage.get('cart').then(res => {
      if(res == null) {
        this.storage.set('cart', JSON.stringify([item]))
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
        this.storage.set('cart', JSON.stringify(cart))
      }
    })
  }
}