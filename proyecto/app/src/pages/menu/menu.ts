import { ApiProvider } from './../../providers/api/api';
import { HomePage } from './../home/home';
import { AdminDashboardPage } from './../admin-dashboard/admin-dashboard';
import { LoginPage } from './../login/login';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, App } from 'ionic-angular';
import { RoleType } from '../../app/roleTypeEnum';
import { RegisterUserPage } from '../register-user/register-user';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage: any;
  public pages: Array<any>;
  private role: any;

  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController,
    private appCtrl: App,
    private api: ApiProvider) {
    this.pages = [];
  }

  ionViewWillEnter() {

    this.role = this.api.getRole();

    switch (this.role) {
      case RoleType.admin:
        this.pages = [
          { title: 'Buses', component: LoginPage, icon: 'navigate' },
          { title: 'Rutas', component: LoginPage, icon: 'map' },
          { title: 'Estaciones', component: LoginPage, icon: 'alarm' },
          { title: 'Administradores', component: AdminDashboardPage, icon: 'contacts' },
          { title: 'Mi perfil', component: LoginPage, icon: 'contact' }
        ];
        break;
      case RoleType.user:
        this.pages = [
          { title: 'Empezar viaje', component: LoginPage, icon: 'navigate' },
          { title: 'Mis viajes', component: LoginPage, icon: 'map' },
          { title: 'Mis alertas', component: LoginPage, icon: 'alarm' },
          { title: 'Mis evaluaciones', component: LoginPage, icon: 'star' },
          { title: 'Mi perfil', component: LoginPage, icon: 'contact' }
        ];
        break;
      case RoleType.default:
        this.pages = [
          { title: 'Iniciar sesión', component: LoginPage, icon: 'log-in' },
          { title: 'Registrarse', component: RegisterUserPage, icon: 'create' },
          { title: 'Empezar viaje', component: LoginPage, icon: 'navigate' },
        ];
        break;
    }

    this.openPage(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page): void {
    this.nav.setRoot(page);
  }

  isLoggedIn(){
    return this.api.isAuth();
  }

  logout() {
    this.api.logout();
    this.appCtrl.getRootNav().setRoot(HomePage);
  }

}
