import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsSettingsPage } from './products-settings';


@NgModule({
  declarations: [
    ProductsSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsSettingsPage),
  ],
})
export class ProductsSettingsPageModule {}
