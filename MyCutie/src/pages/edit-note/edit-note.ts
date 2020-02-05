import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, LoadingController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { Bmobconfig } from "../../common/getBmob";


/**
 * Generated class for the EditNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNotePage extends BaseUI {
  note: any;
  title: any;
  content: any;
  rate: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController) {
    super();
    this.note = this.navParams.get('note');
    console.log(this.note);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditNotePage');
    console.log(this.note);
    this.title = this.note['title'];
    this.content = this.note['content'];
    this.rate = this.note['rate'];
  }

  submit() {
    var loading = super.showLoading(this.loadingCtrl, "");
    if (!(/^[12345]$/.test(String(this.rate)))) {
      super.showToast(this.toastCtrl, "Sorry, rate is from 1 to 5！");
      loading.dismiss();
    }
    else {
      var Bmob = Bmobconfig.getBmob();
      const query = Bmob.Query('todoNote');
      query.get(this.note['objectId']).then(res => {
        console.log(res);
        res.set('title', this.title);
        res.set('rate', Number(this.rate));
        res.set('content', this.content);
        res.save();
      }).catch(err => {
        super.showToast(this.toastCtrl, err);
      });
      loading.dismiss();
      this.dismiss();
    }
  }

  done() {
    var loading = super.showLoading(this.loadingCtrl, "Dealing with this note...");    //存好了之后就返回

    var Bmob = Bmobconfig.getBmob();
    //从todo数据库复制这个note到doneNote里面
    var val = Bmob.User.current()['objectId'];
    var newDone = Bmob.Query('doneNote');
    newDone.set('isShare', false);
    newDone.set('time', this.note['deadline']);
    newDone.set('address', this.note['address']);
    newDone.set('content', this.note['content']);
    newDone.set('title', this.note['title']);
    newDone.set('rate', this.note['rate']);
    newDone.set('owner', val);
    newDone.save().then(() => {
      //从todoNote中删除这个note
      const query = Bmob.Query('todoNote');
      query.destroy(this.note['objectId']).then(res => {
        console.log(res);
        loading.dismiss();
        this.dismiss();
      }).catch(err => {
        loading.dismiss();
        super.showToast(this.toastCtrl, err);
      })
    }).catch(err => {
      loading.dismiss();
      super.showToast(this.toastCtrl, err);
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
