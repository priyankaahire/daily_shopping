import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('mySlider') slider: IonSlides;
  options
  items
  recent
  categories: any = [];
  imageSlider: any = []
  recentOrders: any = [];
  recommItems: any = [];
  constructor(private router: Router) {
      this.goToTabWithId();
      this.getCategories();
      this.getRecentOrders();
      this.getImageSlider();
      this.getRecommItem();
  }

  goToTabWithId() {

  }
 
  ngOnInit() {
  }
  getImageSlider() {
      this.imageSlider = [
        {
          firstname: "ONION",
          lastname: "",
          imageUrl: "assets/imgs/Onion.jpg"
        },
        {
          firstname: "ONION",
          lastname: "",
          imageUrl: "assets/imgs/Onion.jpg"
        },
        {
          firstname: "ONION",
          lastname: "",
          imageUrl: "assets/imgs/Onion.jpg"
        },
        {
          firstname: "ONION",
          lastname: "",
          imageUrl: "assets/imgs/Onion.jpg"
        }
       
      ]
  }
  gotoItem(category) {
    // this.app.getRootNav().push(ItemsListPage, {category: category})
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
  getRecentOrders() {
    this.recentOrders = [
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

  dealOfTheDay() {
    this.router.navigate(['/deal-of-day']);
  }
  onSlideChanged(e) {
  }

  onSlideChangeStart(event) {
    /** isEnd true when slides reach at end slide */
    event.target.isEnd().then(isEnd => {
    });
  }
  gotoDetails(item) {
    let navigationExtras = {
      queryParams: {
        item: JSON.stringify(item)
      }
    };
    this.router.navigate(['details'],navigationExtras)
  }

}
