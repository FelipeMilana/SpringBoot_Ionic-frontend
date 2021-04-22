import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderDTO } from '../../models/order.dto';
import { OrderService } from '../../services/domain/order.service';

@IonicPage()
@Component({
  selector: 'page-orders-settings',
  templateUrl: 'orders-settings.html',
})
export class OrdersSettingsPage {

  orders: OrderDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orderService: OrderService,
    public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    this.orderService.findAll()
      .subscribe(response => {
        this.orders = response as OrderDTO[];

        if(this.orders.length == 0) {
          this.showFailed();
        }
      },
      error => {});
  }

  showFailed() {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: 'Não há pedidos registrados',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('AdminSettingsPage');
          }
        }
      ]
    });
    alert.present();
  }

  showDetails(id: string) {
    this.navCtrl.push('OrderDetailsPage', {orderId: id});
  }
}
