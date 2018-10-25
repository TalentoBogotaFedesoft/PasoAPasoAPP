import { HomePage } from './../home/home';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';
import { RegisterAdminPage } from '../register-admin/register-admin';

@Component({
  selector: 'page-admins',
  templateUrl: 'admins.html',
})
export class AdminsPage {
  user: Array<any>;
  role: string;
  id: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private events: Events) {

  }

  ionViewWillEnter() {
    this.refreshProfile();
  }

  private refreshProfile() {
    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    this.api.getAdmin().subscribe((response) => {
      loading.dismiss();
      this.user = [
        { 'title': 'Nombre', 'note': response.name },
        { 'title': 'Correo', 'note': response.email },
        { 'title': 'Identificación', 'note': response.id },
        { 'title': 'Entidad', 'note': response.entity }
      ];
      this.role = response.role;
      this.id = response.id;
    });
  }

  public authAdmin(): boolean {
    return this.role === 'sys_admin';
  }

  ionViewCanEnter() {
    let role = this.api.getRole();
    return role ? role !== 'user' : false;
  }

  public register(): void {
    this.navCtrl.setRoot(RegisterAdminPage);
  }

  public delete(): void {
    const prompt = this.alertCtrl.create({
      title: 'Eliminar cuenta',
      message: '¿Desea eliminar la cuenta?',
      inputs: [
        {
          name: 'personal_id',
          placeholder: 'Identificación de la cuenta que se desea eliminar'
        }],
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Sí',
          handler: data => {
            const loading = this.loadingCtrl.create({
              content: 'Cargando...'
            });
            loading.present();
            this.api.deleteAdmin(data.personal_id).subscribe((status) => {
              loading.dismiss();
              const toast = this.toastCtrl.create();
              if (status) {
                if (this.id === data.personal_id) {
                  this.api.logout();
                  this.events.publish('loggedOut');
                  this.navCtrl.setRoot(HomePage);
                } else {
                  toast.setMessage('Usuario eliminado con éxito')
                  toast.setDuration(3000);
                }
              } else {
                toast.setMessage('Se presento un error al eliminar la cuenta')
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
