import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { CategoryDTO } from '../../models/category.dto';
import { CategoryService } from '../../services/domain/category.service';

@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {

  formGroup: FormGroup;
  item: CategoryDTO;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public categoryService: CategoryService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      this.formGroup = this.formBuilder.group({
        name:['',[Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      });
  }

  ionViewDidLoad() {
  }

  addCategory() {
    let loader = this.presentLoading();
    this.categoryService.insert(this.formGroup.value)
      .subscribe(response =>{
        loader.dismiss();
        this.showInsertOk();
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot('CategoriesSettingsPage');
      });
      
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Categoria adicionada com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('CategoriesSettingsPage');
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