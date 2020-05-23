import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider1',
  templateUrl: './slider1.html',
  styleUrls: ['./slider1.scss'],
})
export class Slider1Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Slider1Page');
  }

  navigate() {
    this.router.navigate(['/slider2'])
  }

}

