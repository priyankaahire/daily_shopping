import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage implements OnInit {

  mobile: string
  password: string

  constructor(
    private router: Router
    
   ) {
  }

  ngOnInit() {
  }
  
  signin() {
    this.router.navigate(['/signin']);

  }

  signup() {
    this.router.navigate(['/signup']);
  }

}
