import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonSlide } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-deal-of-day',
  templateUrl: './deal-of-day.html',
  styleUrls: ['./deal-of-day.scss'],
})
export class DealOfDayPage implements OnInit {
  categories:any = [];
  items:any = [];

  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private storage: Storage,
    private apiService: ApiService) {
    this.getCategories();
    this.getItems();
  }

  ngOnInit() {
  }
  back() {
    this.router.navigate(['/home']);
  }
  addToCart(item, event:Event) {
    event.stopPropagation();
    let navigationExtras2 = {
      queryParams: {
        special: JSON.stringify(item)
      }
    };
      this.router.navigate(['mycart'],navigationExtras2)
  }
  gotoDetails(item, event) {
   let navigationExtras = {
    queryParams: {
      special: JSON.stringify(item)
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
  getItems() {
    this.items = [
      {
        title: "Palak 250g+Ladies Finger+Cucumber+Capsicum",
        imageUrl: "assets/imgs/vegitables.png",
        price:123.44,
        desc:"3 combo pack fresh vegitables",
        count:2
      },
    {
      title: "Dove Bar Soap-Pack of 3",
      imageUrl: "assets/imgs/dove.png",
      price:400,
      desc:"Cream Beauty Btahing Bar",
      count:3
    },
    {
      title: "Body Care",
      imageUrl: "assets/imgs/personal_care.jpg",
      price:123.44,
      desc:"3 combo pack fresh vegitables",
      count:4
    },
    {
      title: "Fruits",
      imageUrl: "assets/imgs/fruits.jpg",
      price:123.44,
      desc:"3 combo pack fresh vegitables",
      count:3
    }
  ]
  }
  getCategories() {
    this.categories = [
      {
        name: "vegitables",
        imageUrl: "assets/imgs/vegitables.png"
      },
      {
        name: "Home Care",
        imageUrl: "assets/imgs/home_care.jpg"
      },
      {
        name: "Body Care",
        imageUrl: "assets/imgs/personal_care.jpg"
      },
      {
        name: "vegitables",
        imageUrl: "assets/imgs/Onion.jpg"
      },
      {
        name: "Fruits",
        imageUrl: "assets/imgs/fruits.jpg"
      },
      {
        name: "vegitables",
        imageUrl: "assets/imgs/vegitables.png"
      },
      {
        name: "Home Care",
        imageUrl: "assets/imgs/home_care.jpg"
      },
      {
        name: "Body Care",
        imageUrl: "assets/imgs/personal_care.jpg"
      },
      {
        name: "vegitables",
        imageUrl: "assets/imgs/Onion.jpg"
      },
      {
        name: "Fruits",
        imageUrl: "assets/imgs/fruits.jpg"
      }
    ]
  }

  plus(idx, event:Event) {
    event.stopPropagation();
    if(this.items[idx].count != 10) {
      this.items[idx].count += 1;
     // this.updateCart(this.items[idx])
    }
  }

  minus(idx,event:Event) {
    event.stopPropagation();
    if(this.items[idx].count != 0) {
      this.items[idx].count -= 1;
      //this.updateCart(this.items[idx])
    }
  }
}