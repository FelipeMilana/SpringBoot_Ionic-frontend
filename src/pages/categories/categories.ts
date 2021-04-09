import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryDTO } from '../../models/category.dto';
import { CategoryService } from '../../services/domain/category.service';


@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

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
    this.navCtrl.push('ProductsPage', {id: categoryId});  
  }
}
