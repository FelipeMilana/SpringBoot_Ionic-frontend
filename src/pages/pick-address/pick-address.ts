import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { OrderInsertDTO } from '../../models/order.insert.dto';
import { ClientService } from '../../services/domain/client.service';
import { ShoppingCartService } from '../../services/domain/shoppingCart.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: AddressDTO[];
  order: OrderInsertDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clientService: ClientService,
    public storage: StorageService,
    public cartService: ShoppingCartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['addresses'];

          let cart = this.cartService.getCart();

          this.order = {
            clientId: response['id'],
            deliveryAddressId: null,
            payment: null,
            items: cart.items.map(x => {return {quantity: x.quantity, productId: x.product.id}})
          }

        },
        error => {
          if(error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: AddressDTO) {
    this.order.deliveryAddressId = item.id;
    console.log(this.order);
  }
}