import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, ModalController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { AnswerPage } from '../answer/answer';
import { Bmobconfig } from "../../common/getBmob";
import { HttpClient } from "@angular/common/http";


/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI {
  id: string;
  userId: string;
  User: any;
  question: any;
  answers: any;
  answersArray: any;
  errorMessage: any;
  photo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public storage: Storage,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public http: HttpClient) {
    super();
    this.photo = [];
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.loadQuestion(this.id);
  }

  loadQuestion(id) {
    this.storage.get('UserId').then((val) => {
      if (val !== null) {
        this.userId = val;
        var loading = super.showLoading(this.loadingCtrl, "加载中...");
        var Bmob = Bmobconfig.getBmob();
        var query = Bmob.Query('post');
        query.get(id).then((todo) => {
          this.question = todo;
          this.answers = todo['Comment'];
          var query2 = Bmob.Query('postComment');
          query2.containedIn('objectId', this.answers);
          return query2.find();
        }).then((todo) => {
          this.answersArray = todo;
          var i;
          for (i = 0; i < this.answersArray.length; i++) {
            this.answersArray[i]['index'] = i;
          }
          var todo1 = todo;
          var j;
          for (j = 0; j < todo1.length; j++) {
            var feed1 = todo1[j];
            var headimage = feed1['headimage'];
            this.http.get(headimage).subscribe((f) => {
              this.photo.push(f['img']);
            })
          }
        }).then(() => {
        });
        loading.dismiss();
      }
    });
  }

  giveRate(answerId, userId, rate) {
    var loading = super.showLoading(this.loadingCtrl, "Rating...");
    var Bmob = Bmobconfig.getBmob();
    var Newtodo = Bmob.Query('commentrate');
    Newtodo.equalTo('owner', "==", userId);
    Newtodo.equalTo('comment', "==", answerId);
    Newtodo.find().then((res) => {
      if (res.length != 0) {
        loading.dismiss();
        super.showToast(this.toastCtrl, 'Sorry, you have already RATE:(');
      }
      else {
        var todo = Bmob.Query('commentrate');
        todo.set('owner', userId);
        todo.set('comment', answerId);
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

  rate(answerId) {
    this.storage.get('UserId').then((val) => {
      var userId = val;
      this.alertCtrl.create({
        title: 'Give a rate',
        buttons: [{
          text: '1-------------------------Poor',
          handler: () => {
            this.giveRate(answerId, userId, 1);
          }
        }, {
          text: '2---------------------------Fair',
          handler: () => {
            this.giveRate(answerId, userId, 2);
          }
        }, {
          text: '3-------------------------Good',
          handler: () => {
            this.giveRate(answerId, userId, 3);
          }
        }, {
          text: '4-----------------Very Good',
          handler: () => {
            this.giveRate(answerId, userId, 4);
          }
        }, {
          text: '5-----------------Excellent',
          handler: () => {
            this.giveRate(answerId, userId, 5);
          }
        }]
      }).present();
    })
  }

  showAnswerPage() {
    let modal = this.modalCtrl.create(AnswerPage, { "id": this.id });
    //关闭后的回调
    modal.onDidDismiss(() => {
      this.loadQuestion(this.id);
    });
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
