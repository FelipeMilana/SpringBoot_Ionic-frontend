import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ShoppingCartService } from '../../services/domain/shoppingCart.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: ShoppingCartService) {
  }

  ionViewDidLoad() {
   let cart = this.cartService.getCart();
   this.items = cart.items;
  }
}
