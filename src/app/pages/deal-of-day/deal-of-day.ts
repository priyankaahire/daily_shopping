import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlide } from '@ionic/angular';

@Component({
  selector: 'app-deal-of-day',
  templateUrl: './deal-of-day.html',
  styleUrls: ['./deal-of-day.scss'],
})
export class DealOfDayPage implements OnInit {
  categories:any = [];
  items:any = [];

  constructor(private router: Router) {
    this.getCategories();
    this.getItems();
  }

  ngOnInit() {
  }
  back() {
    this.router.navigate(['/home']);
  }
  gotoDetails(item) {
    this.router.navigate(['/details']);
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
        desc:"3 combo pack fresh vegitables"
      },
    {
      title: "Dove Bar Soap-Pack of 3",
      imageUrl: "assets/imgs/dove.png",
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


}
