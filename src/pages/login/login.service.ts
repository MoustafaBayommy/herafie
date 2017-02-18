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

}