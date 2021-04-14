import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ShoppingCartService } from '../../services/domain/shoppingCart.service';
import { ProductService } from '../../services/domain/product.service';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  item: ProductDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public cartService: ShoppingCartService) {
  }

  ionViewDidLoad() {
    let itemId = this.navParams.get('id');

    this.productService.findById(itemId)
      .subscribe(response => {
        this.item = response;
      },
      error => {});
  }

  addToCart(product: ProductDTO) {
    this.cartService.addProduct(product);
    this.navCtrl.setRoot('CartPage');
  }
}
