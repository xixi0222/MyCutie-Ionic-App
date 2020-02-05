import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController, ModalController } from 'ionic-angular';
import { Bmobconfig } from "../../common/getBmob";
import { AddNotePage } from '../add-note/add-note';
import { BaseUI } from '../../common/baseui';
import { EditNotePage } from '../../pages/edit-note/edit-note';
import { TodoPage } from '../todo/todo';
import{ DonePage } from '../done/done';

/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage extends BaseUI{
  login:boolean;
  Ownerid:any;
  todo:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
      super();
  }

  ionViewDidLoad() {
    var Bmob = Bmobconfig.getBmob();
    var currentUser = Bmob.User.current(); 
    if (currentUser){
      this.login = true;
    }
  }

  gotoTodoPage(){
    if (this.login){
      var modal = this.modalCtrl.create(TodoPage);
      modal.present();
    }
    else{
      super.showToast(this.toastCtrl,'Please Login first ^-^');
    }
  }

  gotoDonePage(){
    if (this.login){
      var modal = this.modalCtrl.create(DonePage);
      modal.present();
    }
    else{
      super.showToast(this.toastCtrl,'Please Login first ^-^');
    }
  }
}
