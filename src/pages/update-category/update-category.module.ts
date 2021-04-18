import { NgModule } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { IonicPageModule } from 'ionic-angular';
import { UpdateCategoryPage } from './update-category';

@NgModule({
  declarations: [
    UpdateCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateCategoryPage),
  ],
  providers: [
    Camera
  ]
})
export class UpdateCategoryPageModule {}
