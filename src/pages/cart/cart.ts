import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProductDTO } from '../../models/product.dto';
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

  removeItem(product: ProductDTO) {
    this.items = this.cartService.removeProduct(product).items;
  }

  increaseQuantity(product: ProductDTO) {
    this.items = this.cartService.increaseQuantity(product).items;
  }

  decreaseQuantity(product: ProductDTO) {
    this.items = this.cartService.decreaseQuantity(product).items;
  }

  total() : number {
    return this.cartService.total();
  }

  keepBuying() {
    this.navCtrl.setRoot('CategoriesPage');
  }

  checkOut() {
    this.navCtrl.push('PickAddressPage');
  }
}