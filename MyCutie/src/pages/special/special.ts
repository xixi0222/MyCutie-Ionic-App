import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { HttpClient } from "@angular/common/http";
import { Bmobconfig } from "../../common/getBmob";
import { RecommendDetailsPage } from '../recommend-details/recommend-details';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SpecialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-special',
  templateUrl: 'special.html',
})
export class SpecialPage extends BaseUI {
  recommend: any;
  questions: any;
  postkey: any;
  ans: any;
  userId:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public http: HttpClient,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    super();
    this.questions = [];
  }

  ionViewDidLoad() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.userId = val;
        this.testCloud();
      }
    });
  }

  testCloud() {
    var api = "http://www.sjckedaoyun.top:8890/getRecommend/"+this.userId+"/";
    this.http.get(api).subscribe((f) => {
      this.recommend = f;
      var Bmob = Bmobconfig.getBmob();
      var i = 0;
      for (var p1 in this.recommend) {
        i = i + 1;
        var query = Bmob.Query('post');
        query.get(String(p1)).then((todo) => {
          this.postkey = todo;
        }).then(() => {
          this.questions.push(this.postkey);
        });
      }
    })
  }

  gotoRecommendDetailsPage(recommend,f) {
    var Bmob = Bmobconfig.getBmob();
    var currentUser = Bmob.User.current();
    if (currentUser) {
      this.navCtrl.push(RecommendDetailsPage, { question: f, recommend:recommend });
    }
    else {
      super.showToast(this.toastCtrl, 'Please Login first...');
    }
  }

  giveRate(questionId, userId, rate) {
    var loading = super.showLoading(this.loadingCtrl, "Rating...");
    var Bmob = Bmobconfig.getBmob();
    var Newtodo = Bmob.Query('postrate');
    Newtodo.equalTo('owner', "==", userId);
    Newtodo.equalTo('post', "==", questionId);
    Newtodo.find().then((res) => {
      if (res.length != 0) {
        loading.dismiss();
        super.showToast(this.toastCtrl, 'Sorry, you have already RATE:(');
      }
      else {
        var todo = Bmob.Query('postrate');
        todo.set('owner', userId);
        todo.set('post', questionId);
        todo.set('rate', Number(rate));
        todo.save().then(() => {
          loading.dismiss();
          super.showToast(this.toastCtrl, 'Thank you for your RATE:)');
        }).catch(err => {
          loading.dismiss();
          super.showToast(this.toastCtrl, err);
        });
      }
    });
  }

  rate(questionId) {
    this.storage.get('UserId').then((val) => {
      var userId = val;
      this.alertCtrl.create({
        title: 'Give a rate',
        buttons: [{
          text: '1-------------------------Poor',
          handler: () => {
            this.giveRate(questionId, userId, 1);
          }
        }, {
          text: '2---------------------------Fair',
          handler: () => {
            this.giveRate(questionId, userId, 2);
          }
        }, {
          text: '3-------------------------Good',
          handler: () => {
            this.giveRate(questionId, userId, 3);1
          }
        }, {
          text: '4-----------------Very Good',
          handler: () => {
            this.giveRate(questionId, userId, 4);
          }
        }, {
          text: '5-----------------Excellent',
          handler: () => {
            this.giveRate(questionId, userId, 5);
          }
        }]
      }).present();
    })
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
