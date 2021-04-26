import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';

@IonicPage()
@Component({
  selector: 'page-products-settings',
  templateUrl: 'products-settings.html',
})
export class ProductsSettingsPage {

  items: ProductDTO[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();

    this.productService.findAll()
      .subscribe(response => {
        this.items = response;
        loader.dismiss();
      },
      (error) => {
        loader.dismiss();
      }
      );
  }

  updateProduct(categoryId: string) {
    this.navCtrl.push('UpdateProductPage', {id: categoryId}); 
  }

  askWantDelete(categoryId: string) {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: 'Tem certeza que deseja deletar esse produto?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            let loader = this.presentLoading();

            this.productService.delete(categoryId)
            .subscribe(response => {
              loader.dismiss();
              this.showDeleteOk();
              this.loadData();
            },
            error => {
              loader.dismiss();
            });
          }
        },
        {
          text: 'Cancel',
        }
      ]
    });
    alert.present();
  }

  showDeleteOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Produto deletado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
        }
      ]
    });
    alert.present();
  }

  searchBar(event){
    this.productService.findByProductName(event.target.value)
      .subscribe(response => {
        this.items = [];
        this.items = response['content'];

        if(this.items.length == 0) {
          this.showFailedSearchBar();
        }
      },
      error => {})
  }

  cancelSearchBar() {
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

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }
}
