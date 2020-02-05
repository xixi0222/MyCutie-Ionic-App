import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DataProvider } from '../../providers/data/data';
import { Storage } from "@ionic/storage";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { Bmobconfig } from "../../common/getBmob";



//import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
@Injectable()
export class LoginPage extends BaseUI {
  name: any;
  password: any;
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ViewCtrl: ViewController,
    public modalCtrl: ModalController,
    public LoadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public storage: Storage) {
    super();
  }

  ionViewDidLoad() {
  }

  gotoRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  doLogin() {
    var loading = super.showLoading(this.LoadingCtrl, "Login...");
    var Bmob = Bmobconfig.getBmob();
    Bmob.User.login(this.name, this.password)
      .then(() => {
        this.storage.set('UserId', Bmob.User.current()['objectId']);
        this.storage.set('UserName', Bmob.User.current()['username']);
        loading.dismiss();
        this.dismiss();
        let tabs = this.modalCtrl.create(TabsPage);
        tabs.present();
      }, (error) => {
        super.showToast(this.toastCtrl, error);
        loading.dismiss();
      });
  }

  dismiss() {
    this.ViewCtrl.dismiss();
  }

}
