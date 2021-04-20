import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    this.categoryService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      (error) => {}
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
            this.categoryService.delete(categoryId)
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

}
