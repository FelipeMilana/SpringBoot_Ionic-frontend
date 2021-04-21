import { NgModule } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { IonicPageModule } from 'ionic-angular';
import { UpdateProductPage } from './update-product';

@NgModule({
  declarations: [
    UpdateProductPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateProductPage),
  ],
  providers: [
    Camera
  ]
})
export class UpdateProductPageModule {}
