import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';

@IonicPage()
@Component({
  selector: 'page-update-product',
  templateUrl: 'update-product.html',
})
export class UpdateProductPage {

  product: ProductDTO;
  formGroup: FormGroup;
  picture: string;
  cameraOn: boolean = false;
  cameraRollOn: boolean = false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public formBuilder: FormBuilder,
    public camera: Camera,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        name:['',[Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
        price:['', Validators.required]
      });
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let id = this.navParams.get('id');
    this.productService.findById(id)
      .subscribe(response => {
        this.product = response;        
        this.formGroup.controls.name.setValue(this.product.name);
        this.formGroup.controls.price.setValue(this.product.price);    
      },
      error => {});
  }

  updateProduct() {
    this.productService.update(this.formGroup.value, this.product.id)
    .subscribe(response =>{
      this.showUpdateOk();
    },
    error => {});
  }

  showUpdateOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Produto atualizado com sucesso',
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
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
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
      encodingType: this.camera.EncodingType.PNG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
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

  sendPicture() {
    this.productService.uploadPicture(this.picture, this.product.id)
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
