import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss'],
})
export class SigninPage implements OnInit {
  mobile: string
  password: string
  constructor(private router: Router) { }
  ngOnInit() {
  }
  login() {
    this.router.navigate(['/home'])
    // if(this.mobile === '') {
    //   this.toast.show('Mobile number is required', '5000', 'bottom').subscribe()
    //   return
    // }
    // if(this.mobile.length != 10) {
    //   this.toast.show('Please enter valid number', '5000', 'bottom').subscribe()
    //   return
    // }
  }

  signup() {
    this.router.navigate(['/signup'])
  }

}
