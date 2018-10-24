import { AdminsPage } from './../admins/admins';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormValidators, regexValidators } from '../../app/form-validators';
import { ApiProvider } from '../../providers/api/api';


@Component({
  selector: 'page-register-admin',
  templateUrl: 'register-admin.html',
})
export class RegisterAdminPage {

  registerForm: FormGroup;
  credentialsForm: FormGroup;


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private api: ApiProvider,
     private toastCtrl: ToastController,
     private loadingCtrl: LoadingController,
     private alertCtrl: AlertController,
     private formBuilder: FormBuilder) {

      this.credentialsForm = this.formBuilder.group({
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required]
      }, {
          validator: FormValidators.validate.bind(this)
        });

      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.compose([
          Validators.pattern(regexValidators.email),
          Validators.required])],
        personalId: ['', Validators.required],
        role: ['', Validators.required],
        entity: ['', Validators.required],
        credentialsForm: this.credentialsForm
      });
  }

  public register(): void {

    const params = {
      name: this.registerForm.controls.name.value,
      email: this.registerForm.controls.email.value,
      role: this.registerForm.controls.role.value,
      entity: this.registerForm.controls.entity.value,
      personal_id: this.registerForm.controls.personalId.value,
      password: this.credentialsForm.controls.password.value,
      password_confirmation: this.credentialsForm.controls.passwordConfirmation.value
    }

    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });

    loading.present();

    this.api.registerAdmin(params).subscribe((response: boolean) => {
      loading.dismiss()
      const toast = this.toastCtrl.create();

      if (response) {
        toast.setMessage(`Administrador ${params.name} creado con éxito!`)
        toast.setDuration(3000);
        toast.present();
        this.navCtrl.setRoot(AdminsPage);
      } else {
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Error en el registro, el usuario ya existe o no tiene los permisos para realizar esta operación.',
          buttons: ['OK']
        });
        alert.present();
      }
    });

  }


}
