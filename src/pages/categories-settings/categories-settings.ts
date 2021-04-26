import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { CategoryDTO } from '../../models/category.dto';
import { CategoryService } from '../../services/domain/category.service';

@IonicPage()
@Component({
  selector: 'page-categories-settings',
  templateUrl: 'categories-settings.html',
})
export class CategoriesSettingsPage {

  items: CategoryDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoryService: CategoryService,
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

    this.categoryService.findAll()
      .subscribe(response => {
        this.items = response;
        loader.dismiss();
      },
      (error) => {
        loader.dismiss();
      }
      );
  }

  updateCategory(categoryId: string) {
    this.navCtrl.push('UpdateCategoryPage', {id: categoryId}); 
  }

  askWantDelete(categoryId: string) {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: 'Tem certeza que deseja deletar essa categoria?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            let loader = this.presentLoading();

            this.categoryService.delete(categoryId)
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
      message: 'Categoria deletada com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
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
