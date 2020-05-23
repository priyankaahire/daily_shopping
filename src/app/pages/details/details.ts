import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.html',
  styleUrls: ['./details.scss'],
})
export class DetailsPage implements OnInit {
  constructor(private router: Router) { 
    
  }
  ngOnInit() {
  }
  addToCart() {
    this.router.navigate(['/mycart'])
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
  back() {
    this.router.navigate(['/deal-of-day'])
  }
}
