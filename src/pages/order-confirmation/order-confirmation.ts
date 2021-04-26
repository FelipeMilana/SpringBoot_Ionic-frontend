import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { CartItem } from '../../models/cart-item';
import { ClientDTO } from '../../models/client.dto';
import { OrderInsertDTO } from '../../models/order.insert.dto';
import { ClientService } from '../../services/domain/client.service';
import { OrderService } from '../../services/domain/order.service';
import { ShoppingCartService } from '../../services/domain/shoppingCart.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  order: OrderInsertDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;
  orderCode: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: ShoppingCartService,
    public ClientService: ClientService,
    public orderService: OrderService,
    public loadingCtrl: LoadingController) {

      this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.ClientService.findById(this.order.clientId)
      .subscribe(response => {
        this.client = response as ClientDTO;
        this.address = this.findAddress(this.order.deliveryAddressId, response['addresses']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findAddress(id: string, list: AddressDTO[]) : AddressDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('MyOrdersPage');
  }

  checkOut() {
    let loader = this.presentLoading();

    this.orderService.insert(this.order)
      .subscribe(response => {
        loader.dismiss();
        this.cartService.createOrClearCart();
        this.orderCode = this.extractId(response.headers.get('location'));
      },
      error => {
        loader.dismiss();
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  private extractId(location: string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }
}
