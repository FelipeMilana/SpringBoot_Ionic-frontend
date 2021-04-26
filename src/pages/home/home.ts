import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { LoginDTO } from '../../models/login.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  logs : LoginDTO = {
    email: "",
    password: ""
  };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService,
    public loadingCtrl: LoadingController) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  
  ionViewDidEnter() {
    let loader = this.presentLoading();

    this.auth.refreshToken()
      .subscribe(response => {
        loader.dismiss();
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriesPage');
      }, 
      error => {
        loader.dismiss();
      }
      );
  }

  login() {
    let loader = this.presentLoading();

    this.auth.authenticate(this.logs)
      .subscribe(response => {
        loader.dismiss();
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriesPage');
      }, 
      error => {
        loader.dismiss();
      }
      );
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }
}
