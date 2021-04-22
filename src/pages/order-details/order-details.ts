import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderItem } from '../../models/order-item';
import { OrderDTO } from '../../models/order.dto';
import { OrderService } from '../../services/domain/order.service';

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {

  order: OrderDTO;
  items: OrderItem[];
  length: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orderService: OrderService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let orderId = this.navParams.get('orderId');
    this.orderService.findById(orderId)
      .subscribe(response => {
        this.order = response as OrderDTO;
        this.items = response['items'];
        this.length = this.items.length;
      },
      error => {
        this.navCtrl.pop();
      });
  }

  totalDiscount() :number{
    let sum = 0;
    for(var i=0; i<this.length; i++) {
      sum += this.items[i].discount;
    }
    return sum;
  }
}
