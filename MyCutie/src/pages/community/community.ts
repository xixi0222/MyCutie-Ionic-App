import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ToastController, ViewController, LoadingController, } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { DetailsPage } from '../details/details';
import { Bmobconfig } from "../../common/getBmob";
import { BaseUI } from '../../common/baseui';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";

import { reverse } from 'dns';

/**
 * Generated class for the CommunityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
})
export class CommunityPage extends BaseUI {
  feeds: any;

  photo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public http: HttpClient) {
    super();
    this.photo = [];
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HelpmePage');
    this.getFeeds();
  }

  gotoQuestionPage() {
    var Bmob = Bmobconfig.getBmob();
    var currentUser = Bmob.User.current();
    if (currentUser) {
      var modal = this.modalCtrl.create(QuestionPage);
      modal.onDidDismiss(() => {
        this.todoGetFeeds();
      });
      modal.present();
    }
    else {
      super.showToast(this.toastCtrl, 'Please Login first...');
    }
  }

  getFeeds() {
    this.todoGetFeeds();
    console.log(this.feeds);
    console.log(this.photo);
  }

  todoGetFeeds() {
    var Bmob = Bmobconfig.getBmob();
    var query = Bmob.Query('post');
    query.find().then((todo) => {
      console.log(todo)
      this.feeds = todo.reverse();
      var i;
      for (i = 0; i < this.feeds.length; i++) {
        this.feeds[i]['index'] = i;
        console.log(this.feeds[i]['index']);
      }
      var todo1 = todo.reverse();
      var j;
      for (j = 0; j < todo1.length; j++) {
        var feed1 = todo1[j];
        var headimage = feed1['headimage'];
        console.log(headimage);
        this.http.get(headimage).subscribe((f) => {
          this.photo.push(f['img']);
        })
      }
    }).then(()=>{
    })
  }

  //调转到点击的问题的相应的详细页面
  gotoDetailsPage(questionId) {
    var Bmob = Bmobconfig.getBmob();
    var currentUser = Bmob.User.current();
    if (currentUser) {
      this.navCtrl.push(DetailsPage, { id: questionId });
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
            this.giveRate(questionId, userId, 3);
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
