import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { Bmobconfig } from "../../common/getBmob";
import { Title } from '@angular/platform-browser';

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI {
  title: string;
  content: string;
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public loadingCtrl: LoadingController) {
    super();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad QuestionPage');
  }

  submitQuestion() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl, "Posting...");
        this.submitBack();
        loading.dismiss();
        this.dismiss();
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submitBack() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.storage.get('UserName').then((name) => {
          var username = name;
          var loading = super.showLoading(this.loadingCtrl, "Answering...");
          var Ownerid = val;
          var Bmob = Bmobconfig.getBmob();
          const pointer1 = Bmob.Pointer('_User');
          const OwnerpoiID = pointer1.set(Ownerid);
          var question = Bmob.Query('post');
          var query = Bmob.Query('headimage');
          query.equalTo('owner', "==", Ownerid);
          query.find()
            .then((res) => {
              var url = res[0]['headimage'];
              question.set('headimage', url);
              question.set('username', username);
              question.set('Content', this.content);
              question.set('Owner', OwnerpoiID);
              question.set('Title', this.title);
              question.set('rate', []);
              question.set('Comment', []);
              return question.save();
            }).then(() => {
              loading.dismiss();
              this.dismiss();
            });
        })
      }
    });
  }
}
