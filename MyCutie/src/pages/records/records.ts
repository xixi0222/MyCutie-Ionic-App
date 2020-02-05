import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ToastController, ViewController, LoadingController, } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { DetailsPage } from '../details/details';
import { Bmobconfig } from "../../common/getBmob";
import { BaseUI } from '../../common/baseui';
import { MorePage } from '../more/more';
import { Storage } from '@ionic/storage';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the RecordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-records',
  templateUrl: 'records.html',
})
export class RecordsPage extends BaseUI {
  feeds: any;
  photo: any;  //ownerImg
  picture: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public http: HttpClient) {
    super();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HelpmePage');
    this.feeds = [];
    this.picture = [];
    this.getFeeds();
  }

  gotoMorePage(f) {
    var Bmob = Bmobconfig.getBmob();
    var currentUser = Bmob.User.current();
    if (currentUser) {
      this.navCtrl.push(MorePage, { showus: f });
    }
    else {
      super.showToast(this.toastCtrl, 'Please Login first...');
    }
  }

  getFeeds() {
    this.todoGetFeeds();
  }

  todoGetFeeds() {
    var Bmob = Bmobconfig.getBmob();
    var query = Bmob.Query('showus');
    query.order('-updateAt');
    query.equalTo('ownerId', "==", Bmob.User.current()['objectId']);
    query.find().then((todo) => {
      var feeds = (todo);
      this.feeds = todo;
      var i;
      for (i = 0; i < this.feeds.length; i++) {
        this.feeds[i]['index'] = i;
      }
      var todo1 = todo;
      var k;
      for (k = 0; k < todo1.length; k++) {
        var feed2 = todo1[k];
        var headimage4 = feed2['picture'];
        this.http.get(headimage4).subscribe((f) => {
          this.picture.push(f['img']);
        })
      }
    }
    ).then(() => {
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}



