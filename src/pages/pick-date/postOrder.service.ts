    import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions}from '@angular/http';
import 'rxjs';
import 'rxjs/Rx';
import {Order} from '../../models/order';



@Injectable()
export class PostOrder {
     

     serverUrl:string;

constructor(private http:Http){

 
}


postData(order:Order):Promise<string>{
        let formData:FormData = new FormData();
        formData.append('uploadFile', order.descriptionFile, order.descriptionFile);
        // formData.append();

        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.serverUrl, formData, options)
            .toPromise().then(res => res.json());
}
}