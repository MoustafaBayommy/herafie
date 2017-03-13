import { Injectable } from '@angular/core';
import {Http}from '@angular/http';
import 'rxjs';
import 'rxjs/Rx';
import {Order} from '../models/order';
import {Rate} from '../models/rate';
import { Transfer } from 'ionic-native';

import  * as config   from '../herafie.config.ts';


@Injectable()
export class VerifiyNumberService {
   serverUrl:string;



constructor(private http:Http){
      this.serverUrl=config.data.serverUrl;

}
sendVeifyCode(mobile:String,lang:string):Promise<any>{
    mobile=mobile.split('+')[1];
    console.log(mobile);
    
   return this.http.get(`${this.serverUrl}clients/sendVerifyMessage?mobile=${mobile}&&lang=${lang}`)
    .toPromise().then((response:any)=>{

       return  response.json();
        // console.log(response.json());
        });
}


verifyCode(mobile:String,code:string):Promise<any>{
          mobile=mobile.split('+')[1];

   return this.http.get(`${this.serverUrl}clients/verifySendedCode?mobile=${mobile}&&code=${code}`)
    .toPromise().then((response:any)=>{

       return  response.json();
        // console.log(response.json());
        });
}

}