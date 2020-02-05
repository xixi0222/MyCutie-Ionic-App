import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, ModalController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { Bmobconfig } from "../../common/getBmob";
import { HttpClient } from "@angular/common/http";


/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {

  obj: string;
  objectId: string;
  userId: string;
  User: any;
  question: any;
  likeCount: any;
  repliesArray: any;
  content: any;
  replyId: any;
  answersArray: any;
  errorMessage: any;
  isFavourite: boolean;
  isMyQuestion: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public storage: Storage,
    public http: HttpClient,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    super();
    this.content = null;
  }

  ionViewDidLoad() {
    //得到整个showus对象
    this.obj = this.navParams.get('showus');
    this.load(this.obj);
  }

  submit() {
    var loading = super.showLoading(this.loadingCtrl, "Posting...");
    if (this.content == null) {
      loading.dismiss();
      super.showToast(this.toastCtrl, "Your comment can not be Empty:(");
    }
    else {
      var api = "http://www.sjckedaoyun.top:8890/getRecommend/getEmotion/" + this.content + '/';
      this.http.get(api).subscribe((f) => {
        var result = f['data']['sa'][0];
        if (result['negative_prob'] > 0.7) {
          loading.dismiss();
          super.showToast(this.toastCtrl, "Your comment is not friendly:(");
        }
        else {
          this.storage.get('UserId').then((val) => {
            if (val != null) {
              this.storage.get('UserName').then((name) => {
                var username = name;
                var Bmob = Bmobconfig.getBmob();
                var answer = Bmob.Query('showComments');
                answer.set('ownerName', username);
                answer.set('Content', this.content);
                return answer.save();
              }).then((todo) => {
                this.replyId = todo['objectId'];
                var Bmob = Bmobconfig.getBmob();
                var Question = Bmob.Query('showus');
                return Question.get(this.objectId);
              }).then((todo) => {
                todo.add('comments', [this.replyId]);
                return todo.save();
              }).then(() => {
                loading.dismiss();
                this.dismiss();
              });
            }
            else {
              loading.dismiss();
              super.showToast(this.toastCtrl, "Please Login first...");
            }
          });
        }
      })
    }
  }

  load(obj) {
    var loading = super.showLoading(this.loadingCtrl, "加载中...");
    var Bmob = Bmobconfig.getBmob();
    var Question = Bmob.Query('showus');
    Question.get(this.obj['objectId']).then((todo) => {
      this.obj = todo;
      this.likeCount = todo['likeCount'];
      this.answersArray = todo['comments'];
      this.objectId = todo['objectId'];
      this.storage.get('UserId').then((val) => {
        if (val !== null) {
          this.userId = val;
          var Bmob = Bmobconfig.getBmob();
          var query2 = Bmob.Query('showComments');
          query2.containedIn('objectId', this.answersArray);
          return query2.find();
        }
      }).then((todo) => {
        this.repliesArray = todo;
        this.getIsFavourate();
        loading.dismiss();
      })
    });
  }

  getIsFavourate() {
    var Bmob = Bmobconfig.getBmob();
    this.storage.get('UserId').then((val) => {
      var query = Bmob.Query('showusLikes');
      query.equalTo('ownerId', "==", val);
      query.equalTo('showusId', "==", this.objectId);
      query.find().then(list => {
        if (list.length == 0) {
          this.isFavourite = false;
        }
        else {
          this.isFavourite = true;
        }
      })
    });
  }

  saveFavourite() {
    var loading = super.showLoading(this.loadingCtrl, "Please wait...");
    var Bmob = Bmobconfig.getBmob();
    if (!this.isFavourite) {
      var showus = Bmob.Query('showus');
      showus.get(this.objectId).then((todo) => {
        var number = todo['likeCount']
        todo.set('likeCount', number + 1);
        return todo.save();
      }).then((todo2) => {
        var showuslike = Bmob.Query('showusLikes');
        showuslike.set("ownerId", this.userId);
        showuslike.set("showusId", this.objectId);
        return showuslike.save()
      }).then((todo3) => {
        this.isFavourite = false;
      });
    }
    else {
      var showus2 = Bmob.Query('showus');
      showus2.get(this.objectId).then((todo) => {
        var number = todo['likeCount']
        todo.set('likeCount', number - 1);
        return todo.save();
      }).then((todo2) => {
        var query2 = Bmob.Query('showusLikes');
        query2.equalTo('ownerId', "==", this.userId);
        query2.equalTo('showusId', "==", this.objectId);
        return query2.find();
      }).then((res) => {
        var objid = res[0]['objectId'];
        var query3 = Bmob.Query('showusLikes');
        return query3.destroy(objid);
      }).then((todo3) => {
        this.isFavourite = true;
      });
    }
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
