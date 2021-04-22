import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderService } from '../../services/domain/order.service';
import { OrderDetailsPage } from './order-details';

@NgModule({
  declarations: [
    OrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDetailsPage),
  ],
  providers: [
    OrderService
  ]
})
export class OrderDetailsPageModule {}
