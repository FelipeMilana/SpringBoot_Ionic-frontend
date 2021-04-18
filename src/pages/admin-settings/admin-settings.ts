import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryDTO } from '../../models/category.dto';
import { CategoryService } from '../../services/domain/category.service';

@IonicPage()
@Component({
  selector: 'page-admin-settings',
  templateUrl: 'admin-settings.html',
})
export class AdminSettingsPage {

  items: CategoryDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoryService: CategoryService) {
  }

  ionViewDidLoad() {
    this.categoryService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      (error) => {}
      );
  }

  showProducts(categoryId: string) {
    this.navCtrl.push('AdminProductsPage', {id: categoryId});  
  }

  updateCategory(categoryId: string) {
    this.navCtrl.push('UpdateCategoryPage', {id: categoryId}); 
  }

  deleteCategory() {
  }

}
