import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { CityDTO } from '../../models/city.dto';
import { StateDTO } from '../../models/state.dto';
import { CityService } from '../../services/domain/city.service';
import { ClientService } from '../../services/domain/client.service';
import { StateService } from '../../services/domain/state.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  states: StateDTO[];
  cities: CityDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cityService: CityService,
    public stateService: StateService,
    public clientService: ClientService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        type: ['', [Validators.required]],
        cpfOrCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        password: ['', [Validators.required]],
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        complement: ['',[]],
        district: ['', []],
        cep: ['', [Validators.required]],
        telephone1: ['', [Validators.required]],
        telephone2: ['',[]],
        telephone3: ['',[]],
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

  signupUser() {
    let loader = this.presentLoading();
    this.clientService.insert(this.formGroup.value)
      .subscribe(response => {
        loader.dismiss();
        this.showInsertOk();
      },
      error => {
        loader.dismiss();
      });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
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
