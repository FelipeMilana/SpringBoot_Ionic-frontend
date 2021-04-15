import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { CartItem } from '../../models/cart-item';
import { ClientDTO } from '../../models/client.dto';
import { OrderInsertDTO } from '../../models/order.insert.dto';
import { ClientService } from '../../services/domain/client.service';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: ShoppingCartService,
    public ClientService: ClientService) {

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
}
