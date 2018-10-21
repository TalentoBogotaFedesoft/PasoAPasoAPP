import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { RegisterUserPage } from '../register-user/register-user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email: string;
  public password: string;
  public admin: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
      this.admin = false;
  }

  public login(): void {
    const params = {
      email: this.email,
      password: this.password
    }
    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();

    let loginHandle :any;
    if (this.admin) {
      loginHandle = this.api.loginAdmin(params);
    } else {
      loginHandle = this.api.loginUser(params);
    }

    loginHandle.subscribe((status) => {
      loading.dismiss();
      if (status) {
        const toast = this.toastCtrl.create({
          message: 'Ingresando...',
          duration: 1000
        })
        toast.present();
        //this.navCtrl.push(dash);
      } else {
        const toast = this.toastCtrl.create({
          message: 'Correo o contraseña invalida',
          duration: 3000
        })
        toast.present();
      }
    })
  }

  public register():void{
    this.navCtrl.setRoot(RegisterUserPage);
  }

}
