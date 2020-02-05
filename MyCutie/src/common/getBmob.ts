
export class Bmobconfig{
    public static bmob;
    public static isIniteBmob = 0;
    public static getBmob(){
      if(this.isIniteBmob == 0){
        var Bmob = require('../../node_modules/hydrogen-js-sdk/src/lib/app.js');
        var APP_ID = '8cb8abf41e81e468cb77134382dbe8c7';
        var APP_KEY = '0544db4f98239e44fd86986d28ed8f4c';
        Bmob.initialize(APP_ID, APP_KEY);
        this.bmob = Bmob;
        this.isIniteBmob = 1;
      }
      return this.bmob;
    }
  }