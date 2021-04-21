import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProductDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoryId = this.navParams.get('id');
    let loader = this.presentLoading();
    this.productService.findByCategories(categoryId, this.page, 10)
      .subscribe(response => {
        this.items = this.items.concat(response['content']);
        loader.dismiss();
      },
      error => {
        loader.dismiss();
      });
  }

  showDetails(itemId: string) {
    this.navCtrl.push('ProductDetailPage', {id: itemId});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

  searchBar(event){
    this.productService.findByProductName(event.target.value)
      .subscribe(response => {
        this.items = [];
        this.items = response['content'];
      })
  }

  cancelSearchBar() {
    this.page = 0;
    this.items = [];
    this.loadData();
  }
}
