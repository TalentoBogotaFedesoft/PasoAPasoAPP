import { BusesPage } from './../buses/buses';
import { AdminsPage } from './../admins/admins';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';


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
    let user = this.api.getCurrentUser();

    if (user) {
      this.name = user.name;
      this.email = user.email;
      this.role = user.role;
    }
  }

  public openPage(page): void {
    let pages = {'admins' : AdminsPage, 'buses': BusesPage};
    this.navCtrl.setRoot(pages[page]);
  }

  ionViewCanEnter(){
    return this.role? this.role !== 'user' : false;
   }

}
