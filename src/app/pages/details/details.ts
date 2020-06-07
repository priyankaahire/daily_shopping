import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private activeRoute: ActivatedRoute,private router: Router ) { 
    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.item) {
        this.item = JSON.parse(params.item);
        this.item = {}
        this.item['imageUrl'] =  "assets/imgs/vegitables.png"
        this.item['price'] = '50'
      }
    });
  }
  ngOnInit() {
    this.getorderAgain();
    this.getRecommItem();
  }
  addToCart(item) {
    event.stopPropagation();
    let navigationExtras = {
      queryParams: {
        item: JSON.stringify(item)
      }
    };
      this.router.navigate(['mycart'],navigationExtras)
  }
  onSlideChanged(e) {
    console.log('On slide change event');
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
    });
  }
  back() {
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
    this.orderAgain = [
      {
        title: "Palak 250g+Ladies Finger+Cucumber+Capsicum",
        imageUrl: "assets/imgs/vegitables.png",
        price:123.44,
        desc:"3 combo pack fresh vegitables"
      },
      {
        title: "Palak 250g+Ladies Finger+Cucumber+Capsicum",
        imageUrl: "assets/imgs/vegitables.png",
        price:123.44,
        desc:"3 combo pack fresh vegitables"
      },
    {
      title: "Dove Bar Soap-Pack of 3",
      imageUrl: "assets/imgs/home_care.jpg",
      price:400,
      desc:"Cream Beauty Btahing Bar"
    },
    {
      title: "Body Care",
      imageUrl: "assets/imgs/personal_care.jpg",
      price:123.44,
      desc:"3 combo pack fresh vegitables"
    },
    {
      title: "Fruits",
      imageUrl: "assets/imgs/fruits.jpg",
      price:123.44,
      desc:"3 combo pack fresh vegitables"
    }
  ]
  }
  getRecommItem() {
    this.recommItems = [
      {
        title: "Palak 250g+Ladies Finger+Cucumber+Capsicum",
        imageUrl: "assets/imgs/vegitables.png",
        price:123.44,
        desc:"3 combo pack fresh vegitables"
      },
      {
        title: "Palak 250g+Ladies Finger+Cucumber+Capsicum",
        imageUrl: "assets/imgs/vegitables.png",
        price:123.44,
        desc:"3 combo pack fresh vegitables"
      },
      {
        title: "Dove Bar Soap-Pack of 3",
        imageUrl: "assets/imgs/home_care.jpg",
        price:400,
        desc:"Cream Beauty Btahing Bar"
      },
      {
        title: "Body Care",
        imageUrl: "assets/imgs/personal_care.jpg",
        price:123.44,
        desc:"3 combo pack fresh vegitables"
      },
      {
        title: "Fruits",
        imageUrl: "assets/imgs/fruits.jpg",
        price:123.44,
        desc:"3 combo pack fresh vegitables"
      }
    ]
  }
}
