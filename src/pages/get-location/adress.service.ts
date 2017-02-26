import { Injectable } from '@angular/core';
import {Http}from '@angular/http';
import 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class AdressService {
     key:string='AIzaSyASdic7DWMaptQh7ESsdRNqaXh2mNMCcvQ';
     companyLocation:string='21.467657,39.935631';
    

constructor(private http:Http){

}
getAdressFromLatAndLong(latitude:number,longtitude:number):Promise<any>{
    
   return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longtitude+'&key='+this.key+'&language=ar&region=KSA')
    .toPromise().then((response:any)=>{
                // console.log(response.json());

       return  response.json();
        // console.log(response.json());
        });
            //   .toPromise().then((response:any)=>response.json().results[0].formatted_address);

            // console.log(response.json().results[0].formatted_address.toString());
}




getDestanceInMinutes(from:string,to:string):Promise<string>{
    from=this.companyLocation;
       return this.http.get('/googlemaps/distancematrix/json?units=imperial&origins='+from+'&destinations='+to+'&key='+this.key+'&language=ar&region=KSA')
    .toPromise().then((response:any)=>{
        console.log(response.json());
        console.log(response.json().rows[0].elements[0].duration.text);
       return  response.json().rows[0].elements[0].duration.text;
    }
        );
            
}

// isInMecca(latitude:number,longtitude:number):Promise<string>{
//    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longtitude+'&key='+this.key+'&language=ar&region=KSA')
//     .toPromise().then((response:any)=>response.json());
            
// }

}