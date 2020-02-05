import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { Storage } from "@ionic/storage";
import { Bmobconfig } from "../../common/getBmob";
import { TabsPage } from '../tabs/tabs';
import { HeadfacePage } from '../headface/headface';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { getPicture } from '../../common/getPicture';

import { HttpClient } from "@angular/common/http";
import { Observer } from 'rxjs/Observer';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  notLogin: boolean = true;
  login: boolean = false;
  headface: string;
  nickname: any;
  cover: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public ViewCtrl: ViewController,
    public storage: Storage,
    public http: HttpClient) {
  }

  ionViewDidEnter() {
    this.loadPage();
  }

  ionViewDidLoad() {
    this.loadPage();
  }

  gotoLoginPage() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  loadPage() {
    var Bmob = Bmobconfig.getBmob();
    var url_cover = 'http://abc.zhiduoshao.xyz/2019/06/10/b599a67c4007116c802bfc197e29acb1.jpg';
    this.http.get(url_cover).subscribe((f) => {
      this.cover = f['img'];
    });

    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.notLogin = false;
        this.login = true;
        var currentUser = Bmob.User.current();
        var query = Bmob.Query('headimage');
        query.equalTo('owner', "==", val);
        query.find().then(list => {
          var head = list[0]['headimage'];
          this.http.get(head).subscribe((f) => {
            this.headface = f['img'];
          });
        });
        this.nickname = currentUser['username'];
      }
      else {
        this.notLogin = true;
        this.login = false;
      }
    });
  }

  gotoHeadFace() {
    this.navCtrl.push(HeadfacePage);
  }

  logout() {
    this.storage.remove('UserId');
    var Bmob = Bmobconfig.getBmob();
    var currentUser = Bmob.User.current();
    if (currentUser) {
      Bmob.User.logout();
    }
    let modal = this.modalCtrl.create(TabsPage);
    modal.present();
  }

  dismiss() {
    this.ViewCtrl.dismiss();
  }

}
