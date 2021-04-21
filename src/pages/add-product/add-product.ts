import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryDTO } from '../../models/category.dto';
import { ProductInsertDTO } from '../../models/product.insert.dto';
import { CategoryService } from '../../services/domain/category.service';
import { ProductService } from '../../services/domain/product.service';

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  formGroup: FormGroup;
  categories: CategoryDTO[];
  resultCheckbox: CategoryDTO[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public productService: ProductService,
    public categoryService: CategoryService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        name:['',[Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
        price:['', Validators.required],
        category:['false', Validators.required]
      });
  }

  ionViewDidLoad() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.findAll()
    .subscribe(response => {
      this.categories = response;
    },  
    error => {});
  }

  selectCategory(category, ev){
    if(ev.value) {
      this.resultCheckbox.push(category);
    }
  }

  addProduct() {
    let newProduct: ProductInsertDTO = {
      id: null,
      name: this.formGroup.controls.name.value,
      price: this.formGroup.controls.price.value,
      categoryName: this.resultCheckbox
    }

    this.productService.insert(newProduct)
      .subscribe(response => {
        this.showInsertOk();
      },
      error =>{
        this.navCtrl.setRoot('ProductsSettingsPage');
      })
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Produto adicionado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('ProductsSettingsPage');
          }
        }
      ]
    });
    alert.present();
  }
}
