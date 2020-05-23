import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.html',
  styleUrls: ['./mycart.scss'],
})
export class MycartPage implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
  payNow() {
    this.router.navigate(['/checkout'])
  }
  back() {
    this.router.navigate(['/home'])
  }
}
