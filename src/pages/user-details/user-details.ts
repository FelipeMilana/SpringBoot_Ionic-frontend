import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { ClientDTO } from '../../models/client.dto';
import { ClientService } from '../../services/domain/client.service';

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  client: ClientDTO;
  cpfOrCnpj: string;
  telephones: string[];
  profiles: string[];
  addresses: AddressDTO[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clientService: ClientService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let clientId = this.navParams.get('id');

    this.clientService.findById(clientId)
      .subscribe(response => {
        this.client = response as ClientDTO;
        this.cpfOrCnpj = response['cpfOrCnpj'];
        this.telephones = response['telephones'];
        this.profiles = response['profiles'];
        this.addresses = response['addresses'];
      },
      error => {
        this.navCtrl.pop();
      })
  }
}
