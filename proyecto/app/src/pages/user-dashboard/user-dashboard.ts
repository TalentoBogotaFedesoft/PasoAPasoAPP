import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-user-dashboard',
  templateUrl: 'user-dashboard.html',
})

export class UserDashboardPage {

  public name: string;
  public email: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider) {

    let data = this.api.getCurrentUser();
    if (data) {
      this.name = data.name;
        this.email = data.email;
    }
  }

  public showProfile(): void {
    this.navCtrl.setRoot(ProfilePage);
  }

}
