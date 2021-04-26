import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ClientDTO } from '../../models/client.dto';
import { ClientService } from '../../services/domain/client.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {

  formGroup: FormGroup;
  client: ClientDTO;
  telephones: string[];  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public clientService: ClientService,
    public storage: StorageService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      this.formGroup = this.formBuilder.group({
        name: [null, [Validators.minLength(5), Validators.maxLength(120)]],
        email: [null, [Validators.email]],
        password: [null, []],
        telephone1: [null, []],
        telephone2: [null,[]],
        telephone3: [null,[]],
      });
     
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.client = response as ClientDTO;
          this.telephones = response['telephones'];

          this.formGroup.controls.name.setValue(this.client.name);
          this.formGroup.controls.email.setValue(this.client.email);
          this.formGroup.controls.telephone1.setValue(this.telephones[0]);
          this.formGroup.controls.telephone2.setValue(this.telephones[1]);
          this.formGroup.controls.telephone3.setValue(this.telephones[2]);
        },
        error => {
          if(error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  updateUser() {
    let loader = this.presentLoading();

    this.clientService.update(this.formGroup.value, this.client.id)
      .subscribe(response => {
        loader.dismiss();
        this.showUpdateOk();
      },
      error => {
        loader.dismiss();
      });
  }

  showUpdateOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Perfil atualizado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }
}
