import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the AdminDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html',
})
export class AdminDashboardPage {

  public name: string;
  public role: string;
  public email: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider) {

      console.log('consd panela adm');
      
    let user = this.api.getCurrentUser();
    console.log("paneladmin " + user.email);
    
    if (user) {
      this.name = user.name;
      this.email = user.email;
      this.role = user.role;
    }
  }

  ionViewDidLoad() {


    console.log('ionViewDidLoad AdminDashboardPage');
  }

}
