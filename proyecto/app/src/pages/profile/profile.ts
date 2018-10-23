import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private api: ApiProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {

  }

  ionViewWillEnter() {
    this.refreshProfile();
  }

  private refreshProfile() {
    this.api.getUser().subscribe((response) => {
      this.user = [
        { 'title': 'Nombre', 'note': response.name },
        { 'title': 'Correo', 'note': response.email },
        { 'title': 'Dirección', 'note': response.address }
      ]
    });

  }


  public updateUser(): void {
    const prompt = this.alertCtrl.create({
      title: 'Actualizar perfil',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre'
        },
        {
          name: 'address',
          placeholder: 'Dirección'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            const loading = this.loadingCtrl.create({
              content: 'Cargando...'
            });
            loading.present();
            this.api.updateUser(data).subscribe((status) => {
              loading.dismiss();
              const toast = this.toastCtrl.create();
              if (status) {
                toast.setMessage('Perfil actualizado!')
                toast.setDuration(1000);
                this.refreshProfile();
              } else {
                toast.setMessage('Se presento un error actualizando el perfil')
                toast.setDuration(3000);
              }
              toast.present();
            });
          }
        }
      ]
    });
    prompt.present();

  }

}
