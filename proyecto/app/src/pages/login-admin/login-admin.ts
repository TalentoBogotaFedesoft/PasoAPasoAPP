import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the LoginAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-admin',
  templateUrl: 'login-admin.html',
})
export class LoginAdminPage {
  public email: string;
  public password: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
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
    this.api.loginAdmin(params).subscribe((status) => {
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

}
