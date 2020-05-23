import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider2',
  templateUrl: './slider2.html',
  styleUrls: ['./slider2.scss'],
})
export class Slider2Page implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Slider3Page');
  }
  navigate() {
   this.router.navigate(['/slider3'])
  }
}