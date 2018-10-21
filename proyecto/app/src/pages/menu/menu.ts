import { HomePage } from './../home/home';
import { AdminDashboardPage } from './../admin-dashboard/admin-dashboard';
import { LoginPage } from './../login/login';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, App } from 'ionic-angular';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage: any;
  public pages:Array<any>;

  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController,
              private appCtrl: App) {
    this.pages = [];
  }

  ionViewWillEnter(){
   //isadmin
   /* this.pages = [
      //{ title: 'Iniciar sesión', component: LoginPage, icon: 'log-in'},
      { title: 'Empezar viaje', component: LoginPage, icon: 'navigate'},
      { title: 'Mis viajes', component: LoginPage, icon: 'map'},
      { title: 'Mis alertas', component: LoginPage, icon: 'alarm'},
      { title: 'Mis evaluaciones', component: LoginPage, icon: 'archive'},
    ]; */

    this.pages = [
      //{ title: 'Iniciar sesión', component: LoginPage, icon: 'log-in'},
      { title: 'Buses', component: LoginPage, icon: 'navigate'},
      { title: 'Rutas', component: LoginPage, icon: 'map'},
      { title: 'Estaciones', component: LoginPage, icon: 'alarm'},
      { title: 'Usuarios', component: LoginPage, icon: 'archive'},
      { title: 'Mi perfil', component: LoginPage, icon: 'archive'}
    ];


    this.openPage(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page):void {
    this.nav.setRoot(page);
  }

  logout() {
    //api logout
    this.appCtrl.getRootNav().setRoot(AdminDashboardPage);
  }

}
