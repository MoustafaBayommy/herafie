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
sendVeifyCode(mobil:String,lang:string):Promise<any>{
    
    
   return this.http.get(`${this.serverUrl}clients/sendVerifyMessage?mobile=${mobil}&&lang=${lang}`)
    .toPromise().then((response:any)=>{

       return  response.json();
        // console.log(response.json());
        });
}


verifyCode(mobil:String,code:string):Promise<any>{
   return this.http.get(`${this.serverUrl}clients/verifySendedCode?mobile=${mobil}&&code=${code}`)
    .toPromise().then((response:any)=>{

       return  response.json();
        // console.log(response.json());
        });
}

}