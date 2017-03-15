import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SQLite} from 'ionic-native';
import {User} from '../models/user';
import {Notification} from '../models/notification';

/*
  Generated class for the AppSqlTableService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppSqlTableService {


 static appDataBase:SQLite;
  constructor() {
    if( typeof AppSqlTableService.appDataBase=='undefined'||AppSqlTableService.appDataBase==null){
       AppSqlTableService.appDataBase=new SQLite();
    }

  }

  static openDataBase():any{
               
      return AppSqlTableService.appDataBase.openDatabase({
                name: "user.db",
                location: "default"
            });
  }
  static CreateTableIFnOTeXIST(){     
      return AppSqlTableService.appDataBase.executeSql("CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, mobil TEXT,name TEXT,neighborhood TEXT,email TEXT,notifiy INTEGER)", {});
            
  }
  static insertNewUser(user:User){
let notifiy:number=user.notifiy?1:0;
    console.log('user '+JSON.stringify(user));
 return AppSqlTableService.appDataBase.executeSql(`INSERT INTO User (mobil,name,neighborhood,email,notifiy) VALUES ('${user.mobile}','${user.name}','${user.neighborhood}','${user.email}',${notifiy})`, []);
  }
  

    static updateUser(user:User){
let notifiy:number=user.notifiy?1:0;

    console.log('user '+user);
 return AppSqlTableService.appDataBase.executeSql(`UPDATE User
SET  name =' ${user.name}', neighborhood = '${user.neighborhood}',email='${user.email}',notifiy=${notifiy}
  WHERE mobil= '${user.mobile}'`, []);
  }

  static selectAll(){
return AppSqlTableService.appDataBase.executeSql(`SELECT * FROM User`, {})
  }


  static CreateNotificationTableIFnOTeXIST(){     
      return AppSqlTableService.appDataBase.executeSql("CREATE TABLE IF NOT EXISTS notification (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT,body Text,isReaded INTEGER ,date Text)", {});
            
  }

  static insertNewNotification(notification:Notification){     
      return AppSqlTableService.appDataBase.executeSql(`INSERT INTO notification ('title', 'body', 'isReaded') VALUES ('${notification.title}', '${notification.body}',0);`, {});
            
  }

   static setAllNotificationReaded(){     
      return AppSqlTableService.appDataBase.executeSql(`UPDATE notification
SET  isReaded =1`, [])
  }

  static getNotifications(fromId:number){
return AppSqlTableService.appDataBase.executeSql(`SELECT * FROM notification  WHERE id>${fromId} ORDER BY id  DESC LIMIT 10;`, {})
  }


  static countNotificationsBasedOnState(state:string){
    let stat=state==='new'?0:1;
return AppSqlTableService.appDataBase.executeSql(`SELECT * FROM notification   WHERE isReaded=${stat} ORDER BY id DESC`, {})
  }
}
