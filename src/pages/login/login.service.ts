import { Injectable } from '@angular/core';
import {Http}from '@angular/http';
import 'rxjs';
import 'rxjs/Rx';
import  * as config   from '../../herafie.config.ts';

import {User} from '../../models/user'


@Injectable()
export class LoginService{
  static serverUrl:string;
  static staticHttp:Http;
  constructor(public http:Http){
      LoginService.serverUrl=config.data.serverUrl;
      LoginService.staticHttp=this.http;

  }

 static isUser(mobil:string):Promise<any>{

console.log('sending request ......');

       return LoginService.staticHttp.get(`${LoginService.serverUrl}clients/testClient?mobile=${mobil}`)
    .toPromise().then((response:any)=>{
      //  true;
       return  response.json();
    });
  }


 static createnewAcount(user:User):Promise<any>{

       return LoginService.staticHttp.post(`${LoginService.serverUrl}clients`,user)
    .toPromise().then((response:any)=>{
      //  true;
       return  response.json();
    });
  }

   static updateUserData(user:User):Promise<any>{
  
   let  param:any={
'mobile':user.mobile+'',
'name':user.name+'',
'neighborhood':user.neighborhood+'',
'email':user.email+'',
'notifiy':user.notifiy
     }
console.log(param);
       return LoginService.staticHttp.post(`${LoginService.serverUrl}clients/update`,param)
    .toPromise().then((response:any)=>{
        console.log('return from server.....');

      //  true;
       return  response.json();
    });
  }

}