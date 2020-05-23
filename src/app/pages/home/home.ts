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
  ItemsListPage: any = [];
  dishes: any = [
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
      firstname: "FRUITS",
      lastname: "",
      imageUrl: "assets/imgs/fruits.jpg"
    }
  ]
  constructor(private router: Router) {
      this.goToTabWithId();
      this.getCategories();
      this.getRecentOrders();
  }

  goToTabWithId() {

  }
 
  ngOnInit() {
  }
  gotoItem(category) {
    // this.app.getRootNav().push(ItemsListPage, {category: category})
  }

  async getRecentOrders() {
  }

  getCategories() {
  }

  dealOfTheDay() {
    this.router.navigate(['/deal-of-day']);
  }
  onSlideChanged(e) {
    console.log('On slide change event');
  }

  onSlideChangeStart(event) {
    /** isEnd true when slides reach at end slide */
    event.target.isEnd().then(isEnd => {
      console.log('End of slide', isEnd);
    });
  }
  gotoDetails() {
    this.router.navigate(['/details'])
  }

}
