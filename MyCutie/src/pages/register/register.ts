import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Bmobconfig } from "../../common/getBmob";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {

  telephone: any;
  email: any;
  name: any;
  password: any;
  password2: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public rest: RestProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    super();
  }

  doRegister() {
    //前台验证表单数据的正确性
    //验证国内手机号格式，考虑所有号码可能性
    if (!(/^1[34578]\d{9}$/.test(this.telephone))) {
      super.showToast(this.toastCtrl, "手机格式不对！");

    }
    else if (this.name.length < 3 || this.name.length > 10) {
      super.showToast(this.toastCtrl, "昵称格式不对！（3-10）");

    }
    else if (this.password.length < 6 || this.password.length > 20 ||
      this.password2.length < 6 || this.password2.length > 20) {
      super.showToast(this.toastCtrl, "密码格式不对！（6-20）");
    }
    else if (this.password != this.password2) {
      super.showToast(this.toastCtrl, "两个密码不匹配");
    }
    else {
      var loading = super.showLoading(this.loadingCtrl, "注册中");
      //this.rest.register(this.telephone,)subscribe/f=>.
      this.senddata();
      loading.dismiss();
      super.showToast(this.toastCtrl, "注册成功");
      this.dismiss();
    }

  }

  senddata() {
    var Bmob = Bmobconfig.getBmob();
    let params = {
      username: this.name,
      password: this.password,
      email: this.email,
      phone: this.telephone,
    }
    var userid;
    Bmob.User.register(params).then(res => {
      userid = res['objectId'];
      const query2 = Bmob.Query('headimage');
      query2.set('owner', userid);
      query2.set('headimage', 'http://bmob-cdn-26205.b0.upaiyun.com/2019/06/10/4a5c7c84406b91f780f38db4f6d15a40.jpg');
      query2.save();
    }).catch(err => {
      console.log(err);
    });
  }

  gotologin() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegisterPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
