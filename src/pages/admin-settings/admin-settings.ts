import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-settings',
  templateUrl: 'admin-settings.html',
})
export class AdminSettingsPage {


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
  }

  ionViewDidLoad() {
  }

  loadCategories(){
    this.navCtrl.push('CategoriesSettingsPage');
  }

  loadProducts() {
    this.navCtrl.push('ProductsSettingsPage');
  }

  loadUsers() {
    this.navCtrl.push('UsersSettingsPage');
  }

  loadOrders() {
    this.navCtrl.push('CRIAR');
  }
  
}
