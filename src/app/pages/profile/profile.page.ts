import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  data

  constructor(
    private storage: Storage
  ) {
    this.storage.get('user').then(res => {
      this.data = JSON.parse(res)
    })
  }

  ngOnInit() {
  }

}
