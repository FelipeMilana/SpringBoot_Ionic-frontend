import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Client } from '../../models/client';
import { ClientService } from '../../services/domain/client.service';

@IonicPage()
@Component({
  selector: 'page-users-settings',
  templateUrl: 'users-settings.html',
})
export class UsersSettingsPage {

  clients: Client[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clientService: ClientService,
    public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  ionViewDidLoad() { 
    this.loadData();
  }

  loadData() {
    this.clientService.findAll()
      .subscribe(response => {
        this.clients = response as Client[];

        if(this.clients.length == 0) {
          this.showFailed();
        }
      },
      error => {});
  }

  showFailed() {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: 'Não há clientes registrados',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('AdminSettingsPage');
          }
        }
      ]
    });
    alert.present();
  }

  showDetails(clientId: string) {
    this.navCtrl.push('UserDetailsPage', {id: clientId});
  }

  askWantDelete(clientId: string) {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: 'Tem certeza que deseja deletar esse cliente?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.clientService.delete(clientId)
            .subscribe(response => {
              this.showDeleteOk();
              this.loadData();
            },
            error => {});
          }
        },
        {
          text: 'Cancel',
        }
      ]
    });
    alert.present();
  }

  showDeleteOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cliente deletado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
        }
      ]
    });
    alert.present();
  }
}
