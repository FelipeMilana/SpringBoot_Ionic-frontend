import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    this.productService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      (error) => {}
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
            this.productService.delete(categoryId)
            .subscribe(response => {
              this.showDeleteOk();
              this.loadData();
            },
            error => {});
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
      })
  }

  cancelSearchBar() {
    this.items = [];
    this.loadData();
  }
}
