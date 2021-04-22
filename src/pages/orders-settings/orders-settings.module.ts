import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderService } from '../../services/domain/order.service';
import { OrdersSettingsPage } from './orders-settings';

@NgModule({
  declarations: [
    OrdersSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersSettingsPage),
  ],
  providers: [
    OrderService
  ]
})
export class OrdersSettingsPageModule {}
