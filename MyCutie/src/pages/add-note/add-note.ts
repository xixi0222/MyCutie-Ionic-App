import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, LoadingController } from 'ionic-angular';
import { Bmobconfig } from "../../common/getBmob";
import { BaseUI } from '../../common/baseui';


/**
 * Generated class for the AddNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
})
export class AddNotePage extends BaseUI {
  title: any;
  content: any;
  todo: any;
  priority: number;
  rate: number;
  deadline: Date;
  location: any;
  time: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController) {
    super();
  }

  ionViewDidLoad() {
  }

  submit() {
    var loading = super.showLoading(this.loadingCtrl, "Adding note...");
    if (!(/^[12345]$/.test(String(this.rate)))) {
      //rate检查正确性
      super.showToast(this.toastCtrl, "Sorry, rate is from 1 to 5！");
      loading.dismiss();
    }
    else if (this.deadline == null) {
      //deadline必须输入，如果没有输入则提醒用户
      super.showToast(this.toastCtrl, "Sorry, please input deadline!");
      loading.dismiss();
    }
    else {
      //没有错误，进行note的存储
      var Bmob = Bmobconfig.getBmob();
      var Newtodo = Bmob.Query('todoNote');
      var val = Bmob.User.current()['objectId'];
      this.time = {
        "__type": "Date",
        "iso": String(this.deadline).replace('T', ' ') + ':00',
      };
      Newtodo.set('owner', val);
      Newtodo.set('title', this.title);
      Newtodo.set('content', this.content);
      Newtodo.set('rate', Number(this.rate));
      Newtodo.set('address', this.location);
      Newtodo.set('deadline', this.time);
      Newtodo.save().then(() => {
        loading.dismiss();
        this.dismiss();
        super.showToast(this.toastCtrl, 'Saved successfully!');
      }).catch(err => {
        loading.dismiss();
        this.dismiss();
        super.showToast(this.toastCtrl, err);
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
