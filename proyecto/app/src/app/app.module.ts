import { TravelPage } from './../pages/travel/travel';
import { AdminsPage } from './../pages/admins/admins';
import { ProfilePage } from './../pages/profile/profile';
import { UserDashboardPage } from './../pages/user-dashboard/user-dashboard';
import { RegisterUserPage } from './../pages/register-user/register-user';
import { AdminDashboardPage } from './../pages/admin-dashboard/admin-dashboard';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ApiProvider } from '../providers/api/api';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { RegisterAdminPage } from '../pages/register-admin/register-admin';
import { BusesPage } from '../pages/buses/buses';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AdminDashboardPage,
    RegisterUserPage,
    UserDashboardPage,
    ProfilePage,
    RegisterAdminPage,
    AdminsPage,
    BusesPage,
    TravelPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AdminDashboardPage,
    RegisterUserPage,
    UserDashboardPage,
    ProfilePage,
    RegisterAdminPage,
    AdminsPage,
    BusesPage,
    TravelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}
