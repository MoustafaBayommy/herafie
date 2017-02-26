import { Component,ViewChild,ElementRef} from '@angular/core';
import { NavController, NavParams ,LoadingController,Platform,AlertController} from 'ionic-angular';
import { Geolocation,Diagnostic  } from 'ionic-native';
import {AdressService} from './adress.service';
import {MainPage} from '../pages';
import {Order} from '../../models/order';
import    * as config   from '../../herafie.config.ts';
import {OrderService} from '../../providers/order.server';
import { ConnectivityService } from '../../providers/connectivity-service';



declare var google;
/*
  Generated class for the GetLocation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-get-location',
  templateUrl: 'get-location.html'
})
export class GetLocationPage {

@ViewChild('map') mapElement: ElementRef;
  map: any;
  mapInitialised: boolean = false;
  apiKey: any='AIzaSyASdic7DWMaptQh7ESsdRNqaXh2mNMCcvQ';
  loader:any;
  static clientAdress:string='';
  static clientLong:number;
  static clientLat:number;

noConnectionDisplay:string='none';
  static  navController: NavController;
   appTitle:string;
  appsubTitle:string;
  static staticPlatform:Platform;
  duration:string='';

  constructor(public connectivityService: ConnectivityService,
  public orderService:OrderService,
  public alertCtrl: AlertController,
  public loadingCtrl: LoadingController,
  public adressService:AdressService,
  public navCtrl: NavController,
  public navParams: NavParams,
  public platform:Platform) {
    OrderService.order=new Order();
GetLocationPage.staticPlatform=this.platform;
 this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;
    
    GetLocationPage.navController=this.navCtrl;

      this.loader = this.loadingCtrl.create({
      content: "جارى تحديد موقعك...انتظر رجاء"
    });
this.loader.present();


  if(typeof google == "undefined" || typeof google.maps == "undefined"){
    this.loader.dismiss();
         this.noConnectionDisplay='block';
  }else{
        this.showMap();

    

  }
    //  Diagnostic.isLocationAvailable().then(result=>{
    //  this.loadMapSdk();
    //  }).catch(err=>{
    //  alert('location isnt avaliable');
    //  });

  }

get clientAdress(){
  return GetLocationPage.clientAdress;
}
  ionViewDidLoad() {

//       this.loader = this.loadingCtrl.create({
//       content: "جارى تحديد موقعك...انتظر رجاء"
//     });
// this.loader.present();

//  this.loadMapSdk();



    // if(typeof google != 'undefined'&&google!=null){

// setTimeout(function(){
// 
//         this.showMap();
//     }else{
//       this.loader.dismiss();
    
// //       this.loader.dismiss();
// //           let alert2 = this.alertCtrl.create({
// //       title: 'خطأ',
// //       subTitle: ' تأكد من الإتصال بالانترنت ثم حاول مجددا',
// //       buttons: ['إعادة المحاولة']
// //     });

// //     alert2.present();

//  GetLocationPage.goToNext();
     
//     }
//     console.log('ionViewDidLoad GetLocationPage');
  }


 

 static goToNext(){
   OrderService.order.adressText=GetLocationPage.clientAdress;
   OrderService.order.adressLat= GetLocationPage.clientLat;
   OrderService.order.adressLong= GetLocationPage.clientLong;
   GetLocationPage.navController.setRoot(MainPage);

 }
 
 
  showMap(){
        this.mapInitialised = true;
        let optionsGPS = {timeout: 250000, enableHighAccuracy: true};

    Geolocation.getCurrentPosition(optionsGPS).then((position) => {
    console.log('yourlocation is: ',position.coords.latitude, position.coords.longitude)
let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
let lat=position.coords.latitude;
let lng=position.coords.longitude;
GetLocationPage.clientLong=lng;
GetLocationPage.clientLat=lat;

console.log('get distance ......');

this.adressService.getDestanceInMinutes('',lat+','+lng).then(duration=>{
  
  this.duration=duration
   console.log(duration);

    this.adressService.getAdressFromLatAndLong(lat,lng).then(adress=>{
      
      console.log(adress);

      let regionName=adress.results[3].address_components[0].long_name;
           console.log(regionName);
      console.log(adress);
console.log('Displaying Map ......');

      let isInMecca=true;
         if(isInMecca){
           GetLocationPage.clientAdress=adress.results[0].formatted_address;
  let mapOptions = {
        center: latLng,
        zoom:17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable:false,
        scrollwheel: false,
        scaleControl: false,
        mapTypeControl: false,
         navigationControl: false,
      streetViewControl: false,
      disableDefaultUI:true
      }

   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  //  var marker = new google.maps.Marker({map: this.map, position:latLng,    title:"Hello World!"});
  //       marker.addListener('click', function() {
  //
  //         alert('jhjhs');
  //         // infowindow.open(map, marker);
  //       });

var bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(lat,lng),
      new google.maps.LatLng(lat,lng));
var swBound = new google.maps.LatLng(lat, lng);
 var neBound = new google.maps.LatLng(lat, lng);
 var bounds = new google.maps.LatLngBounds(swBound, neBound); 
     if(typeof google != 'undefined'&&google!=null){
    PingLayer.prototype = new google.maps.OverlayView();

    PingLayer.prototype.onAdd = function() {

     var div = this.div = document.createElement('div');
		
		div.className = 'marker';
		
		div.style.position = 'absolute';
		div.style.cursor = 'pointer';
		div.style.width = '20px';
		div.style.height = '20px';
    // div.onclick=function(){
    //         // this.navCtrl.push();

    // }

    google.maps.event.addDomListener(div, "click", function(event) {			
			// google.maps.event.trigger(self, "click");
      // alert('I clicked');
      GetLocationPage.goToNext();
      // GetLocationPage.navController.push(MainPage,{'clientAdress':GetLocationPage.clientAdress});

		});
		// div.style.background = 'blue';
        // var div = document.createElement('DIV');
        // div.className = "ping";
        // // this.getPanes().overlayLayer.appendChild(div);
        		 this.getPanes().overlayImage.appendChild(div);

        div.appendChild(document.createElement("DIV"))
        this.div = div;
                // this.div.className += "mark";
// <span id="minutes">
//   <span style="
//    font-size: 120%;
//     position: relative;
//     top: -3px;
//     right: 10px;
   
//   ">${GetLocationPage.duration}</span>
        // this.div.h
       this.div. innerHTML=`
  <div class="markerBodey">
  

 
  <span style="
font-size: 120%;
    position: relative;
    top: 3px;
    left: 0px;
    font-weight: 900;
  "> إعتمد هذا الموقع</span>
<i class="fa fa-chevron-circle-left" style="
       top: 5px;
    right: 15px;
    position: relative;
     color:#fff;font-size:190%"></i>
  </div>     
  <div class="markerpulse"><div class="dot"></div>
  <div class="pulse"></div></div>`;

    }

    PingLayer.prototype.draw = function() {

        var overlayProjection = this.getProjection();
        var sw = overlayProjection.fromLatLngToDivPixel(this.bounds.getSouthWest());
        var ne = overlayProjection.fromLatLngToDivPixel(this.bounds.getNorthEast());
        var div = this.div;
       div.style.left = sw.x + 'px';
       div.style.top = ne.y + 'px';
       var width:number=parseInt(div.style.width.substr(0, div.style.width.length-2));
       var height:number=parseInt(div.style.height.substr(0, div.style.height.length-2));

  div.style.left = (sw.x -width/2) + 'px';
	div.style.top = (ne.y -height) + 'px';
      //  div.style.width = (ne.x - sw.x) + 'px';
      //  div.style.height = (sw.y - ne.y) + 'px';
    }
}

 new PingLayer(bounds, this.map);
           this.loader.dismiss();
             this.noConnectionDisplay='none';

         }else{
           
      this.loader.dismiss();
      this.showAlert(); 
      //then exit app
      // this.navCtrl.pop();

         }
    }
    ).catch((err) => {

      //exception from address
 this.showGpsAlertError();
});
}
    ).catch((err) => {
//exception from distance
      //exception from address
 this.showGpsAlertError();
});
      
    // }
  }).catch((err) => {
 this.showGpsAlertError();
});
 
  }


  showGpsAlertError() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: ' خطأ اثناء تحديدالموقع تأكد من تفغيل موقعك ثم حاول  مجددا'
    });
    alert.present();
    setTimeout(function(){
     alert.dismiss();
    GetLocationPage.staticPlatform.exitApp();
    },5000)
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: ' غير مسموح بإستخدام التطبيق خارج نطاق منطقة مكة المكرمة جارى الخروج من التطبيق'
    });
    alert.present();
    setTimeout(function(alert){
     alert.dismiss();
    GetLocationPage.staticPlatform.exitApp();
    },5000)
  }  

   addConnectivityListeners(){
 
    let onOnline = () => {
 
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
 

 this.loadMapSdk();

        } else {
 
          if(!this.mapInitialised){
            this.showMap();
          }
 
          this.enableMap();
        }
      }, 2000);
 
    };
 
    let onOffline = () => {
      this.disableMap();
    };
 
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
 
  }


 reloadGoogleMapSdk(){

       window['mapInit'] = () => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
//  if(typeof google == 'undefined'||google==null){
               this.disableMap();
             }else{
        this.showMap();
             this.enableMap();
            }
      }

     let script = document.createElement("script");


          if(this.apiKey){
        script.src = ' https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&language=ar&region=KSA&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
      }
 
      document.body.appendChild(script);  
 
    
 }

   loadMapSdk(){
         console.log("Google maps DOSENT loadded Going to loade it ..");

// this.addConnectivityListeners();
 
  if(typeof google == "undefined" || typeof google.maps == "undefined"){
  // alert(this.connectivityService.isOnline());

    console.log("Google maps JavaScript needs to be loaded.");
    this.disableMap();
 
    if(this.connectivityService.isOnline()){
      console.log("online, loading map");
 
      //Load the SDK
      window['mapInit'] = () => {
        this.showMap();
        this.enableMap();
      }
 
      let script = document.createElement("script");
      script.id = "googleMaps";

      if(this.apiKey){
        script.src = ' https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&language=ar&region=KSA&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
      }
 
      document.body.appendChild(script);  
 
    } 
  }
  else {
 

    if(this.connectivityService.isOnline()){
      console.log("showing map");
           this.noConnectionDisplay='none';

      this.showMap();
      // this.enableMap();
    }else {
      console.log("disabling map");
     this.noConnectionDisplay='block';

      // this.disableMap();
    }
 
  }
 
  }

    disableMap(){
      console.log('disable Map');
       this.loader.dismiss();
               this.noConnectionDisplay='block';

  }
 
  enableMap(){
         this.noConnectionDisplay='none';

    console.log("enable map");
  }

  TestConnectionAgain(){
         this.loader = this.loadingCtrl.create({
      content: "جارى تحديد موقعك...انتظر رجاء"
    });
    this.loader.present();
  //  this.loadMapSdk();
  this.reloadGoogleMapSdk();
  }
 
 
}




 function PingLayer(bounds, map) {
        this.bounds = bounds;
        this.setMap(map);
    }
//   if(typeof google != 'undefined'&&google!=null){
//     PingLayer.prototype = new google.maps.OverlayView();

//     PingLayer.prototype.onAdd = function() {

//      var div = this.div = document.createElement('div');
		
// 		div.className = 'marker';
		
// 		div.style.position = 'absolute';
// 		div.style.cursor = 'pointer';
// 		div.style.width = '20px';
// 		div.style.height = '20px';
//     // div.onclick=function(){
//     //         // this.navCtrl.push();

//     // }

//     google.maps.event.addDomListener(div, "click", function(event) {			
// 			// google.maps.event.trigger(self, "click");
//       // alert('I clicked');
//       GetLocationPage.goToNext();
//       // GetLocationPage.navController.push(MainPage,{'clientAdress':GetLocationPage.clientAdress});

// 		});
// 		// div.style.background = 'blue';
//         // var div = document.createElement('DIV');
//         // div.className = "ping";
//         // // this.getPanes().overlayLayer.appendChild(div);
//         		 this.getPanes().overlayImage.appendChild(div);

//         div.appendChild(document.createElement("DIV"))
//         this.div = div;
//                 // this.div.className += "mark";

//         // this.div.h
//        this.div. innerHTML=`
//   <div class="markerBodey">
//   <span id="minutes">
//   <span style="
//    font-size: 120%;
//     position: relative;
//     top: -3px;
//     right: 10px;
   
//   "> 10 </span>

//  <span style="
// font-size: 100%;
//     position: relative;
//     top: 8px;
//     left: 9px;
// ">دقيقة</span>


//   </span>
//   <span style="
// font-size: 120%;
//     position: relative;
//     top: 3px;
//     left: 0px;
//     font-weight: 900;
//   "> إعتمد هذا الموقع</span>
// <i class="fa fa-chevron-circle-left" style="
//        top: 5px;
//     right: 15px;
//     position: relative;
//      color:#fff;font-size:190%"></i>
//   </div>     
//   <div class="markerpulse"><div class="dot"></div>
//   <div class="pulse"></div></div>`;

//     }

//     PingLayer.prototype.draw = function() {

//         var overlayProjection = this.getProjection();
//         var sw = overlayProjection.fromLatLngToDivPixel(this.bounds.getSouthWest());
//         var ne = overlayProjection.fromLatLngToDivPixel(this.bounds.getNorthEast());
//         var div = this.div;
//        div.style.left = sw.x + 'px';
//        div.style.top = ne.y + 'px';
//        var width:number=parseInt(div.style.width.substr(0, div.style.width.length-2));
//        var height:number=parseInt(div.style.height.substr(0, div.style.height.length-2));

//   div.style.left = (sw.x -width/2) + 'px';
// 	div.style.top = (ne.y -height) + 'px';
//       //  div.style.width = (ne.x - sw.x) + 'px';
//       //  div.style.height = (sw.y - ne.y) + 'px';
//     }
// }

