import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ClientDTO } from '../../models/client.dto';
import { OrderDTO } from '../../models/order.dto';
import { ClientService } from '../../services/domain/client.service';
import { OrderService } from '../../services/domain/order.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage {

  client: ClientDTO;
  orders: OrderDTO[] = [];
  clientOrders: OrderDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService,
    public orderService: OrderService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();

    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.client = response as ClientDTO;
          
          this.orderService.findByPage(this.page, 10, "ASC")
            .subscribe(response => {
              loader.dismiss();
              this.orders = response['content'] as OrderDTO[];
              
              for(var i=0; i<this.orders.length; i++) {
                if(this.client.id == this.orders[i].client.id) {
                  this.clientOrders.push(this.orders[i]);
                }
              }
              
              if(this.clientOrders.length == 0) {
                this.showFailed();
              }
              
            },
            error => {
              loader.dismiss();
            });
        },
        error => {
          loader.dismiss();
          if(error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      loader.dismiss();
      this.navCtrl.setRoot('HomePage');
    }
  }

  showDetails(id: string) {
    this.navCtrl.push('OrderDetailsPage', {orderId: id});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
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
            this.navCtrl.setRoot('CategoriesPage');
          }
        }
      ]
    });
    alert.present();
  }
}
