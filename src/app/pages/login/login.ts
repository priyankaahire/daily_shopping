import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx'
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage implements OnInit {

  mobile: string
  password: string

  constructor(
    private toast: Toast,
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
