import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation
import { OrderService } from '../../providers/order.server';
import { Notification } from '../../models/notification';

/*
  Generated class for the Offers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
    animations:  [
          trigger('bounce', [
      state('bouncing', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => bouncing', [
        animate('1000ms ease-in', keyframes([
          style({transform: 'translate3d(0,0,0)', offset: 0}),
          style({transform: 'translate3d(0,-10px,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ])
    ,
      trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0.1
      })),
      transition('visible <=> invisible', animate('200ms linear'))
    ])
 
    ]
})
export class OffersPage {

     titlestyelClass:string;
flipState: String = 'notFlipped';
flyState: String = 'out';
fadeState: String = 'invisible';
bounceState:String="noBounce";
singleOffer:string='none';
allOffer:string='block';

notifications:Notification[];
selectNotification:Notification;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
            this.titlestyelClass="offers_"+OrderService.lang;
            this.notifications=[{title:"سباك محصلش",body:"دلوقتى تقدر تعمل احسن سباكة بخصم 20% فى الميه لو اتكلمت دلوقتى حالا",isReaded:0,date:'ff'}]

  }

  ionViewDidLoad() {
        this.bounceState = 'bouncing';  
   setTimeout(()=>{
this.fadeState='visible';
   },500);
    console.log('ionViewDidLoad OffersPage');
  }
displayOffer(notification:Notification){
  this.selectNotification=notification
  this.singleOffer="block";
  this.allOffer="none"
}

bakToAll(){
   this.singleOffer="none";
  this.allOffer="block"
}
}
