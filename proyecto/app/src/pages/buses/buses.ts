import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-buses',
  templateUrl: 'buses.html',
})
export class BusesPage {

  role: string;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusesPage');
  }

  public authAdmin(): boolean {
    return this.role === 'sys_admin';
  }

  ionViewCanEnter() {
    this.role = this.api.getRole();
    return this.role ? this.role !== 'user' : false;
  }


}
