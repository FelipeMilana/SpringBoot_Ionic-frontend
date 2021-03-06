import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { ClientDTO } from '../../models/client.dto';
import { ClientService } from '../../services/domain/client.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  client: ClientDTO;
  cpfOrCnpj: string;
  telephones: string[];
  profiles: string[];
  addresses: AddressDTO[];
  picture: string;
  cameraOn: boolean = false;
  cameraRollOn: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService,
    public camera: Camera,
    public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.loadData();
  }
  
  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.client = response as ClientDTO;
          this.cpfOrCnpj = response['cpfOrCnpj'];
          this.telephones = response['telephones'];
          this.profiles = response['profiles'];
          this.addresses = response['addresses'];
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

  getCameraPicture() {
    this.cameraOn = true;
    this.cameraRollOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((ImageData) => {
      this.picture = 'data:image/jpeg;base64,' + ImageData;
      this.cameraOn = false;
      this.cameraRollOn = false;
    },
    (err) => {
      this.cameraOn = false;
      this.cameraRollOn = false
    });
  }

  getCameraRoll() {
    this.cameraRollOn = true;
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((ImageData) => {
      this.picture = 'data:image/jpeg;base64,' + ImageData;
      this.cameraOn = false;
      this.cameraRollOn = false;
    },
    (err) => {
      this.cameraOn = false;
      this.cameraRollOn = false
    });
  }

  sendPicture() {
    let loader = this.presentLoading();

    this.clientService.uploadPicture(this.picture)
      .subscribe(response => {
        loader.dismiss();
        this.picture = null;
        this.loadData();
      },
      error => {
        loader.dismiss();
      });
  }

  cancel() {
    this.picture = null;
  }

  updateProfileData() {
    this.navCtrl.push('UpdateProfilePage');
  }

  addAddress(id: string) {
    this.navCtrl.push('AddAddressPage', {clientId: id});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }
}
