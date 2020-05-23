import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlide } from '@ionic/angular';

@Component({
  selector: 'app-deal-of-day',
  templateUrl: './deal-of-day.html',
  styleUrls: ['./deal-of-day.scss'],
})
export class DealOfDayPage implements OnInit {

  constructor(private router: Router) { }

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
      console.log('End of slide', isEnd);
    });
  }
  onSlideChanged(e) {
    console.log('On slide change event');
  }
}
