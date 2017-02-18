import { Injectable } from '@angular/core';
import {Http}from '@angular/http';
import 'rxjs';
import 'rxjs/Rx';
import {Order} from '../models/order';
import {Rate} from '../models/rate';
import { Transfer } from 'ionic-native';

import  * as config   from '../herafie.config.ts';

            const fileTransfer = new Transfer();

@Injectable()
export class MyOrdersService {
   serverUrl:string;



constructor(private http:Http){
      this.serverUrl=config.data.serverUrl;

}
getMyOrders(mobil:String):Promise<any>{
    
    
   return this.http.get(`${this.serverUrl}orders/getClientOrders?mobile=${mobil}`)
    .toPromise().then((response:any)=>{

       return  response.json();
        // console.log(response.json());
        });
}


sendMyOrder(order:Order):Promise<any>{
   return this.http.post(`${this.serverUrl}orders`,order)
    .toPromise().then((response:any)=>{

       return  response.json();
        });
}


sendRating(rate:Rate):Promise<any>{
    console.log(rate);
        console.log(this.serverUrl);

   return this.http.post(`${this.serverUrl}ratings`,rate)
    .toPromise().then((response:any)=>{
                console.log(response.json());

       return  response.json();
        });
}

uploadFile(path:string):Promise<any>{
  var options: any;

  options = {
     fileKey: 'file'
  };
 
   return fileTransfer.upload(path,`${this.serverUrl}orders`,Option);
}
}