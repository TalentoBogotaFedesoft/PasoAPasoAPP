import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TravelPage } from '../travel/travel';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pages: Array<{ title: string, component: any}>;

  constructor(public navCtrl: NavController) {
    this.pages = [
      { title: 'Iniciar sesión', component: LoginPage},
      { title: 'Empezar viaje', component: TravelPage},
    ];
  }

  openPage(page) {
    this.navCtrl.setRoot(page.component);
  }

}
