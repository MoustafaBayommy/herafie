import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import    * as config   from '../../herafie.config.ts';

/*
  Generated class for the ContactUs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var google;

@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html'
})
export class ContactUsPage {
  @ViewChild('map') mapElement: ElementRef;
map:any;
appTitle:string;
  appsubTitle:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {


  this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');

    this.loadmap();
  }

  loadmap(){
    let latLng = new google.maps.LatLng(21.467657,39.935631);

      let mapOptions = {
        center: latLng,
        zoom:18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable:true,
        scrollwheel: true,
        scaleControl: false,
        mapTypeControl: false,
         navigationControl: false,
      streetViewControl: false,
      disableDefaultUI:true
      }

   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
   var marker = new google.maps.Marker({map: this.map, position:latLng,    title:"Hello World!"});
        marker.addListener('click', function() {
  
          // alert('jhjhs');
          // // infowindow.open(map, marker);
        });
  }

}
