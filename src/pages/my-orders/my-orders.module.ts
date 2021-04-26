import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderService } from '../../services/domain/order.service';
import { MyOrdersPage } from './my-orders';

@NgModule({
  declarations: [
    MyOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyOrdersPage),
  ],
  providers: [
    OrderService
  ]
})
export class MyOrdersPageModule {}
