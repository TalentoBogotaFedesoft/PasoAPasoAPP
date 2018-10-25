import { FormValidators, regexValidators } from './../../app/form-validators';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {
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
      credentialsForm: this.credentialsForm
    });
  }
  
  public register(): void {

    const params = {
      name: this.registerForm.controls.name.value,
      email: this.registerForm.controls.email.value,
      password: this.credentialsForm.controls.password.value,
      password_confirmation: this.credentialsForm.controls.passwordConfirmation.value
    }

    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });

    loading.present();

    this.api.registerUser(params).subscribe((response: boolean) => {
      loading.dismiss()
      const toast = this.toastCtrl.create();

      if (response) {
        toast.setMessage('Registro exitoso!')
        toast.setDuration(1000);
        toast.present();
        this.navCtrl.setRoot(LoginPage);
      } else {
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Error en el registro, ¿quizás ya tienes una cuenta?',
          buttons: ['OK']
        });
        alert.present();
      }
    });

  }

}
