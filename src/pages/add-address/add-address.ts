import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CityDTO } from '../../models/city.dto';
import { StateDTO } from '../../models/state.dto';
import { CityService } from '../../services/domain/city.service';
import { ClientService } from '../../services/domain/client.service';
import { StateService } from '../../services/domain/state.service';

@IonicPage()
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {

  formGroup: FormGroup;
  clientId: string;
  states: StateDTO[];
  cities: CityDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public clientService: ClientService,
    public stateService: StateService,
    public cityService: CityService,
    public alertCtrl: AlertController) {

      this.clientId = this.navParams.get('clientId');

      this.formGroup = this.formBuilder.group({
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        complement: ['',[]],
        district: ['', []],
        cep: ['', [Validators.required]],
        stateId: [null, [Validators.required]],
        cityId: [null, [Validators.required]] 
      });
  }

  ionViewDidLoad() {
    this.stateService.findAll()
      .subscribe(response => {
        this.states = response;
        this.formGroup.controls.stateId.setValue(this.states[0].id);
        this.updateCities();
      },  
      error => {});
  }

  updateCities() {
    let state_id = this.formGroup.value.stateId;
    this.cityService.findAllByState(state_id)
      .subscribe(response => {
        this.cities = response;
        this.formGroup.controls.cityId.setValue(null);
      },
      error => {});
  }

  insertAddress() {
    this.clientService.insertAddress(this.formGroup.value, this.clientId)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Endereço adicionado com sucesso',
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
}
