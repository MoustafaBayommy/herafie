import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as config from '../../herafie.config.ts';
import { OrderService } from '../../providers/order.server';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation

/*
  Generated class for the ContactUs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var google;

@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
   animations:[    trigger('bounce', [
      state('bouncing', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => bouncing', [
        animate('700ms ease-in', keyframes([
          style({transform: 'translate3d(0,0,0)', offset: 0}),
          style({transform: 'translate3d(0,-10px,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ])
    ,
     trigger('flyInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(150%, 0, 0)'
      })),
      transition('in => out', animate('150ms ease-in')),
      transition('out => in', animate('150ms ease-out'))
    ])
    ]

})
export class ContactUsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  appTitle: string;
  appsubTitle: string;
  titlestyelClass: string;
  bounceState: String = "noBounce";
  flayState0: string = "out";
  flayState1: string = "out";
  flayState2: string = "out";
  flayState3: string = "out";
  flayState4: string = "out";
  flayState5: string = "out";
  apiKey: any = 'AIzaSyASdic7DWMaptQh7ESsdRNqaXh2mNMCcvQ';
  mapReady:string='block';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.titlestyelClass = "contactus_" + OrderService.lang;


    this.appTitle = config.data.appTitle;
    this.appsubTitle = config.data.appSubTitle;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');

       setTimeout(() => {
this.flayState0='in';
      setTimeout(() => {
this.flayState1='in';
     setTimeout(() => {
this.flayState2='in';
     setTimeout(() => {
this.flayState3='in';
     setTimeout(() => {
this.flayState4='in';
     setTimeout(() => {
this.flayState5='in';

    }, 150);
    }, 150);
    }, 150);
    }, 150);
    }, 150);
    }, 100);
    this.bounceState = 'bouncing';
      if (typeof google == "undefined" || typeof google.maps == "undefined") {
        this.reloadGoogleMapSdk();
      }else{
    this.loadmap();
      }
  }

  loadmap() {
    let latLng = new google.maps.LatLng(21.467657, 39.935631);

    let mapOptions = {
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable: true,
      scrollwheel: true,
      scaleControl: false,
      mapTypeControl: false,
      navigationControl: false,
      streetViewControl: false,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    var marker = new google.maps.Marker({ map: this.map, position: latLng, title: "Hello World!" });
    marker.addListener('click', function () {

      // alert('jhjhs');
      // // infowindow.open(map, marker);
    });
    this.mapReady="none";
  }

   reloadGoogleMapSdk() {

    window['mapInit'] = () => {
      //  if (typeof google === 'object' && typeof google.maps === 'object'){
      //                              alert('loaddes');

      //  }
      if (typeof google == "undefined" || typeof google.maps == "undefined") {
        //  if(typeof google == 'undefined'||google==null){
      } else {
        // alert('mapIntiateed000');
    this.loadmap();

  
      }
    }

    let script = document.createElement("script");
    let att1 = document.createAttribute("async");
    let att2 = document.createAttribute("defer");

    script.setAttributeNode(att1);
    script.setAttributeNode(att2);

    // if(this.apiKey){
    script.src = ' https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&language=' + OrderService.lang + '&region=KSA&callback=mapInit';
    // } else {
    //   script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
    // }

    document.body.appendChild(script);


  }


}
