import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {
  public name: string;
  public email: string;
  public password: string;
  public password_confirmation: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: ApiProvider,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserPage');
  }

  public register():void{

    const params = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    }

    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });

    loading.present();

    this.api.registerUser(params).subscribe((status: boolean) => {
      loading.dismiss()
      const toast = this.toastCtrl.create();
      if(status) {
        toast.setMessage('Usuario registrado con éxito')
        toast.setDuration(1000);
        this.navCtrl.setRoot(LoginPage);
      } else {
        toast.setMessage('Error al registrar el usuario, verifica tu información')
        toast.setDuration(3000);
      }
      toast.present();
    });

  }

}
