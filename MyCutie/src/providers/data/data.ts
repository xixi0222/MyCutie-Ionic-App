//import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite/ngx";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  //myAppDatabase: SQLiteObject;
  constructor(public http: Http,private sqlite: SQLite) {
    //console.log('Hello DataProvider Provider');
  }

  // initDatabase(){
  //   this.sqlite.create({name: 'cheshiname.db',location: 'default'})
  //   .then((db: SQLiteObject) => {
  //     this.myAppDatabase = db;
  //   })
  //   .catch(
  //     e => {alert('写入数据库失败2');}
  //     );
  // }

}

