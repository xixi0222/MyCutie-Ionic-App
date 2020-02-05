import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { Bmobconfig } from "../../common/getBmob";
import { BaseUI } from '../../common/baseui';
import { MomentsPage } from '../../pages/moments/moments';
import { RecordsPage } from '../records/records';
import { PostPage } from '../post/post';
import { HttpClient } from "@angular/common/http";


/**
 * Generated class for the ShowusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-showus',
  templateUrl: 'showus.html',
})
export class ShowusPage extends BaseUI {
  login: boolean;
  Ownerid: any;
  todo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public http: HttpClient) {
    super();
  }

  ionViewDidLoad() {
    var Bmob = Bmobconfig.getBmob();
    var currentUser = Bmob.User.current();
    if (currentUser) {
      this.login = true;
    }
  }
  
  gotoMomentsPage() {
    if (this.login) {
      var modal = this.modalCtrl.create(MomentsPage);
      modal.present();
    }
    else {
      super.showToast(this.toastCtrl, 'Please Login first ^-^');
    }
  }

  gotoRecordsPage() {
    if (this.login) {
      var modal = this.modalCtrl.create(RecordsPage);
      modal.present();
    }
    else {
      super.showToast(this.toastCtrl, 'Please Login first ^-^');
    }
  }

  gotoPostPage(){
    if (this.login) {
      this.navCtrl.push(PostPage);
    }
    else {
      super.showToast(this.toastCtrl, 'Please Login first ^-^');
    }
  }
}
