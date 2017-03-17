import { Injectable } from '@angular/core';
import {Http}from '@angular/http';
import 'rxjs';
import 'rxjs/Rx';
import {Order} from '../models/order';
import {Rate} from '../models/rate';
import { Transfer } from 'ionic-native';

import  * as config   from '../herafie.config.ts';


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
        console.log('sending ... '+order.descriptionFile);
   return this.http.post(`${this.serverUrl}orders`,order)
    .toPromise().then((response:any)=>{
   console.log(response);
      console.log(response.json());

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
       
            const fileTransfer = new Transfer();
  var options: any;
console.log('uploading files '+path);
  options = {
     fileKey: 'file',
          chunkedMode: false,

          fileName: 'file.'+ path.split('.')[1],
mimeType:'application/octet-stream',
        // headers: {
        //             Connection: "close"

        // }

  };

  fileTransfer.onProgress=(progressEvent:any)=> {
    if (progressEvent.lengthComputable) {
        console.log(progressEvent.loaded / progressEvent.total);
    } else {
                    console.log('uploading..');
    }
};
 
   return fileTransfer.upload(path,`${this.serverUrl}orders/uploadFile`,options,true);
}
}