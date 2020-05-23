import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider3',
  templateUrl: './slider3.html',
  styleUrls: ['./slider3.scss'],
})
export class Slider3Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate() {
    this.router.navigate(['/login']);
  }

}
