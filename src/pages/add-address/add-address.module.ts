import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityService } from '../../services/domain/city.service';
import { StateService } from '../../services/domain/state.service';
import { AddAddressPage } from './add-address';

@NgModule({
  declarations: [
    AddAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAddressPage),
  ],
  providers: [
    CityService,
    StateService
  ]
})
export class AddAddressPageModule {}
