import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
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
    private api: ApiProvider,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController) {

    let data = this.api.getCurrentUser();
    console.log("paneluser " + data.email);
    if (data) {
      this.name = data.name;
        this.email = data.email;
    }
  }

  public showProfile(): void {
    this.navCtrl.setRoot(ProfilePage);
  }

}
