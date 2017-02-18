import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SQLite} from 'ionic-native';
import {User} from '../models/user';

/*
  Generated class for the AppSqlTableService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppSqlTableService {


 static appDataBase:SQLite;
  constructor() {
       AppSqlTableService.appDataBase=new SQLite();

  }

  static openDataBase():any{
               
      return AppSqlTableService.appDataBase.openDatabase({
                name: "user.db",
                location: "default"
            });
  }
  static CreateTableIFnOTeXIST(){     
      return AppSqlTableService.appDataBase.executeSql("CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, mobil TEXT)", {});
            
  }
  static insertNewUser(user:User){

    console.log('user '+user);
 return AppSqlTableService.appDataBase.executeSql(`INSERT INTO User (mobil) VALUES (${user.mobile})`, []);
  }
  

  static selectAll(){
return AppSqlTableService.appDataBase.executeSql(`SELECT * FROM User`, {})
  }



}
