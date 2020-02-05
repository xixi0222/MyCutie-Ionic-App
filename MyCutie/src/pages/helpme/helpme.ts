import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { Bmobconfig } from "../../common/getBmob";
import { BaseUI } from '../../common/baseui';
import { SpecialPage } from '../special/special';
import { CommunityPage } from '../community/community';

/**
 * Generated class for the HelpmePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-helpme',
  templateUrl: 'helpme.html',
})
export class HelpmePage extends BaseUI {
  feeds: any;
  login: boolean;
  Ownerid: any;
  todo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
    super();
  }

  ionViewDidLoad() {
    var Bmob = Bmobconfig.getBmob();
    var currentUser = Bmob.User.current();
    if (currentUser) {
      this.login = true;
    }
  }

  gotoSpecialPage() {
    if (this.login) {
      var modal = this.modalCtrl.create(SpecialPage);
      modal.present();
    }
    else {
      super.showToast(this.toastCtrl, 'Please Login first ^-^');
    }
  }

  gotoCommunityPage() {
    var modal = this.modalCtrl.create(CommunityPage);
    modal.present();
  }
}