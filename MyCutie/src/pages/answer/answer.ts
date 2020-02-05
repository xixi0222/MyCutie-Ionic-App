import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from "../../common/baseui";
import { Bmobconfig } from "../../common/getBmob";


/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI {
  id: string;
  errorMessage: any;
  content: string;
  Questionid: string;
  Ownerid: string;
  Answerid: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public storage: Storage) {
    super();
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.storage.get('UserName').then((name) => {
          var username = name;
          var loading = super.showLoading(this.loadingCtrl, "Answering...");
          this.Questionid = this.id;
          this.Ownerid = val;
          var Bmob = Bmobconfig.getBmob();
          const pointer1 = Bmob.Pointer('_User');
          const OwnerpoiID = pointer1.set(this.Ownerid);
          const pointer2 = Bmob.Pointer('post');
          const postpoiID = pointer2.set(this.Questionid);
          var answer = Bmob.Query('postComment');
          var query = Bmob.Query('headimage');
          query.equalTo('owner', "==", this.Ownerid);
          query.find()
            .then((res) => {
              console.log(res[0]['headimage']);
              var url = res[0]['headimage'];
              answer.set('headimage', url);
              answer.set('username', username);
              answer.set('Content', this.content);
              answer.set('Owner', OwnerpoiID);
              answer.set('rate', []);
              answer.set('post', postpoiID);
              return answer.save();
            }).then((todo) => {
              this.Answerid = todo['objectId'];
              var Question = Bmob.Query('post');
              return Question.get(this.Questionid)
            }).then((todo) => {
              todo.add('Comment', [this.Answerid]);
              todo.save();
            }).then(() => {
              loading.dismiss();
              this.dismiss();
            });
        })
      }
      else {
        super.showToast(this.toastCtrl, "Please Login first...");
      }
    });
  }
}
