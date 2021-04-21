import { Component } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
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
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
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

        if(this.items.length == 0) {
          this.showFailed();
        }
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
    let categoryId = this.navParams.get('id');
    this.productService.findByProductsByNameInCategories(categoryId,event.target.value)
      .subscribe(response => {
        this.items = [];
        this.items = response['content'];

        if(this.items.length == 0) {
          this.showFailedSearchBar();
        }
      })
  }

  cancelSearchBar() {
    this.page = 0;
    this.items = [];
    this.loadData();
  }

  showFailedSearchBar() {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: 'Não há produtos com esse nome',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.cancelSearchBar();
          }
        }
      ]
    });
    alert.present();
  }

  showFailed() {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: 'Não há produtos registrados',
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
