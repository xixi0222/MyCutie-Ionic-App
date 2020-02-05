import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


export class Bmobconfig{
  public static bmob;
  public static isInited = 0;

  public static getBmob(){
    if(this.isInited == 0){
      this.isInited = 1;
      var Bmob = require('../../node_modules/hydrogen-js-sdk/src/lib/app.js');
      var APP_ID = '8cb8abf41e81e468cb77134382dbe8c7';
      var APP_KEY = '0544db4f98239e44fd86986d28ed8f4c';
      Bmob.initialize(APP_ID, APP_KEY);
      this.bmob = Bmob;
      
    }
    console.log(this.bmob);
    return this.bmob;
  }
}


