import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesSettingsPage } from './categories-settings';

@NgModule({
  declarations: [
    CategoriesSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriesSettingsPage),
  ],
})
export class CategoriesSettingsPageModule {}
