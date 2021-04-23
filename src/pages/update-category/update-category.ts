import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryDTO } from '../../models/category.dto';
import { CategoryService } from '../../services/domain/category.service';

@IonicPage()
@Component({
  selector: 'page-update-category',
  templateUrl: 'update-category.html',
})
export class UpdateCategoryPage {

  formGroup: FormGroup;
  item: CategoryDTO;
  imageUrl: string;
  picture: string;
  cameraOn: boolean = false;
  cameraRollOn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public categoryService: CategoryService,
    public alertCtrl: AlertController,
    public camera: Camera) {

      this.formGroup = this.formBuilder.group({
        name:['',[Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      });
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoryId = this.navParams.get('id');
    this.categoryService.findById(categoryId)
      .subscribe(response => {
        this.item = response as CategoryDTO;
        this.imageUrl = response['imageUrl'];
        this.formGroup.controls.name.setValue(this.item.name);
      },
      error => {});
  }

  updateCategory() {
    this.categoryService.update(this.formGroup.value, this.item.id)
      .subscribe(response =>{
        this.showUpdateOk();
      },
      error => {});
      
  }

  showUpdateOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Categoria atualizada com sucesso',
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

  getCameraPicture() {
    this.cameraOn = true;
    this.cameraRollOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((ImageData) => {
      this.picture = 'data:image/png;base64,' + ImageData;
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
      mediaType: this.camera.MediaType.PICTURE
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
    this.categoryService.uploadPicture(this.picture, this.item.id)
      .subscribe(response => {
        this.picture = null;
        this.loadData();
      },
      error => {});
  }

  cancel() {
    this.picture = null;
  }
}
