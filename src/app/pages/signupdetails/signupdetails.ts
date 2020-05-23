import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupdetails',
  templateUrl: './signupdetails.html',
  styleUrls: ['./signupdetails.scss'],
})
export class SignupdetailsPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  back() {
    this.route.navigate(['/signup']);
  }
  save() {
    this.route.navigate(['/login']);
  }

}
