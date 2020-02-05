import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { Bmobconfig } from "../../common/getBmob";
import { AddNotePage } from '../add-note/add-note';
import { BaseUI } from '../../common/baseui';
import { EditNotePage } from '../../pages/edit-note/edit-note';
/**
 * Generated class for the TodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html',
})
export class TodoPage extends BaseUI {
  Ownerid: any;
  todo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ViewCtrl: ViewController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
    super();
  }

  ionViewDidLoad() {
    var Bmob = Bmobconfig.getBmob();
    var currentUser = Bmob.User.current();
    if (currentUser) {
      this.loadingNotes(Bmob);
    }
  }

  loadingNotes(Bmob) {
    this.Ownerid = Bmob.User.current()['objectId'];
    var query = Bmob.Query('todoNote');
    query.equalTo('owner', "==", this.Ownerid);
    query.find().then((todo) => {
      this.todo = todo;
    })
  }

  addNote() {
    var Bmob = Bmobconfig.getBmob();
    var currentUser = Bmob.User.current();
    if (currentUser) {
      var modal = this.modalCtrl.create(AddNotePage);
      modal.onDidDismiss(() => {
        this.loadingNotes(Bmob);
      });
      modal.present();
    }
  }
  
  edit(note) {
    var Bmob = Bmobconfig.getBmob();
    var currentUser = Bmob.User.current();
    if (currentUser) {
      var modal = this.modalCtrl.create(EditNotePage, { note: note });
      modal.onDidDismiss(() => {
        this.loadingNotes(Bmob);
      });
      modal.present();
    }
  }

  press(note) {
    this.alertCtrl.create({
      title: '提示',
      message: '确认删除该便签吗？',
      buttons: [{
        text: '取消',
        role: 'cancel',
        handler: () => { }
      }, {
        text: '删除',
        handler: () => {
          this.delete(note);
        }
      }]
    }).present();
  }
  
  delete(note) {
    var Bmob = Bmobconfig.getBmob();
    const query = Bmob.Query('todoNote');
    query.destroy(note['objectId']).then(res => {
    }).catch(err => {
      super.showToast(this.toastCtrl,err);
    })
    this.loadingNotes(Bmob);
  }

  dismiss() {
    this.ViewCtrl.dismiss();
  }

}
