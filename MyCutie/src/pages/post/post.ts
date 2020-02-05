import { Component } from '@angular/core';
import { IonicPage, normalizeURL, NavController, NavParams, ViewController, ToastController, ModalController, LoadingController, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { Bmobconfig } from "../../app/app.component";
import { File } from '@ionic-native/file';
import { BaseUI } from '../../common/baseui';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';


declare var cordova: any; //导入第三方的库定义到 TS 项目中
/**
* Generated class for the PostPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

//@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage extends BaseUI {
  userId: any;
  lastPic: string = null;
  path: string;
  content: string;
  img: any;
  headimage: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public camera: Camera,
    public transfer: Transfer,
    public file: File,
    public filePath: FilePath,
    public platform: Platform,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController) {
    super();
  }

  ionViewDidEnter() {
    this.lastPic = null;
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.userId = val;
      }
    });
  }

  //点击按钮跳出选择框，可以选择方式或的照片。
  presentActionSheet() {
    this.alertCtrl.create({
      title: 'Please choose one',
      buttons: [{
        text: 'camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Photo Album',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => { }
      }]
    }).present();
  }

  takePicture(sourceT) {
    const CameraOptions = {
      quality: 50, //相片质量 0 -100
      destinationType: this.camera.DestinationType.DATA_URL, //DATA_URL 是 base64 FILE_URL 是文件路径
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true, //是否保存到相册
      sourceType: sourceT, //是打开相机拍照还是打开相册选择 PHOTOLIBRARY : 相册选择, CAMERA : 拍照,
    }

    this.camera.getPicture(CameraOptions).then((imageData) => {
      // console.log("got file: " + imageData);
      this.lastPic = imageData;
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.path = base64Image;
    }, (err) => {
      // Handle error
    });
  };

  submit() {
    this.uploadImage();
  }

  //按一个按钮可以上传
  uploadImage() {
    var loading = super.showLoading(this.loadingCtrl, "UPLoading...");
    var Bmob = Bmobconfig.getBmob();
    var upload = {
      'img': this.path
    }
    var file = Bmob.File("showusphoto.jpg", upload);
    file.save().then((obj) => {
      this.img = obj[0]['url'];
      var query = Bmob.Query('headimage');
      query.equalTo('owner', "==", Bmob.User.current()['objectId']);
      return query.find();
    }).then((res) => {
      this.headimage = res[0]['headimage'];
      var showuspost = Bmob.Query('showus');
      showuspost.set("comments", []);
      showuspost.set("content", this.content);
      showuspost.set("likeCount", Number(0));
      showuspost.set("ownerId", Bmob.User.current()['objectId']);
      showuspost.set("picture", this.img);
      showuspost.set("ownerImg", this.headimage);
      //添加数据，第一个入口参数是null
      return showuspost.save();
    }).then((todo) => {
      loading.dismiss();
    })
  }
}


