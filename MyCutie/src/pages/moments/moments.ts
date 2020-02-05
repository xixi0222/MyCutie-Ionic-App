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
 * Generated class for the MomentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-moments',
  templateUrl: 'moments.html',
})
export class MomentsPage extends BaseUI {
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
    this.feeds = [];
    this.photo = [];
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
    query.find().then((todo) => {
      var feeds = todo;
      //var feeds = [{ username: 'yxx' }, { username: 'xx' },{ username: 'yxx' }, { username: 'xx' },{ username: 'yxx' }, { username: 'xx' },{ username: 'yxx' }, { username: 'xx' }];
      if (feeds.length > 6) {
        var num;
        var choosed = [];
        while (choosed.length < 6) {
          num = Math.floor(Math.random() * feeds.length + 1);
          if (choosed.indexOf(num) == -1) {
            choosed.push(num);
          }
        }

        var ii;
        for (ii = 0; ii < 6; ii++) {
          var feed = todo[choosed[ii]];
          feed['index'] = ii;
          this.feeds.push(feed);
        }

        var t;
        var t1;

        for (t = 0; t < 6; t++) {
          var feed3 = feeds[choosed[t]];
          var headimage = feed3['ownerImg'];
          this.http.get(headimage).subscribe((f) => {
            this.photo.push(f['img']);
          })
        }
        for (t1 = 0; t1 < 6; t1++) {
          var feed4 = feeds[choosed[t1]];
          var headimage2 = feed4['picture'];
          this.http.get(headimage2).subscribe((f) => {
            this.picture.push(f['img']);
          })
        }
      }
      else {
        this.feeds = todo;
        var i;
        for (i = 0; i < this.feeds.length; i++) {
          this.feeds[i]['index'] = i;
        }
        var todo1 = todo;
        var j;
        var k;
        for (j = 0; j < todo1.length; j++) {
          var feed1 = todo1[j];
          var headimage3 = feed1['ownerImg'];
          this.http.get(headimage3).subscribe((f) => {
            this.photo.push(f['img']);
          })
        }
        for (k = 0; k < todo1.length; k++) {
          var feed2 = todo1[k];
          var headimage4 = feed2['picture'];
          this.http.get(headimage4).subscribe((f) => {
            this.picture.push(f['img']);
          })
        }
      }
    }
    ).then(() => {
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
