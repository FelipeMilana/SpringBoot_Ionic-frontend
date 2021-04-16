import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryDTO } from '../../models/category.dto';
import { CategoryService } from '../../services/domain/category.service';
import { ClientService } from '../../services/domain/client.service';
import { StorageService } from '../../services/storage.service';


@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  items: CategoryDTO[];
  hasAdmin: boolean = false;
  profiles: string[];
   
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public categoryService: CategoryService,
    public storage: StorageService,
    public clientService: ClientService) {
  }

  ionViewDidLoad() {
    this.categoryService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      (error) => {}
      );

    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
       .subscribe(response => {
        this.profiles = response['profiles'];
            
        let position = this.profiles.indexOf('ADMIN');
  
        if(position != -1) {
          this.hasAdmin = true;
        }
      },
      error => {
        if(error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
    }
    else {
     this.navCtrl.setRoot('HomePage');
    }
  }

  showProducts(categoryId: string) {
    this.navCtrl.push('ProductsPage', {id: categoryId});  
  } 
}
