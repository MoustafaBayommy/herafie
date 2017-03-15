import { Component } from '@angular/core';
import {trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation

import { NavController, NavParams, Platform } from 'ionic-angular';
import    * as config   from '../../herafie.config.ts';
import { ContactUsPage } from '../pages';
import { OffersPage } from '../pages';

import { HowToUsePage }from '../pages';
import { GetLocationPage } from '../pages';
import { OrderService } from '../../providers/order.server';
import { AppSqlTableService } from '../../providers/app-sql-table-service';
import { Splashscreen } from "ionic-native";
import { Push, PushToken} from '@ionic/cloud-angular';
import { Notification } from '../../models/notification';
import { Badge } from 'ionic-native';

/*
  Generated class for the Welcome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
  animations:  [
 
    trigger('flip', [
      state('flipped', style({
        transform: 'rotate(360deg)',
     
      })),
      transition('* => flipped', animate('500ms ease'))
  ])
  ,
 
    trigger('flyInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(150%, 0, 0)'
      })),
      transition('in => out', animate('200ms ease-in')),
      transition('out => in', animate('200ms ease-out'))
    ])
  ,
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
export class WelcomePage {
   titlestyelClass:string;
flipState: String = 'notFlipped';
flyState: String = 'out';
fadeState: String = 'invisible';
bounceState:String="noBounce";
static numberOfUnreadedNotification:number=0;
static latestNotification:Notification;

  constructor(public platform: Platform,public navCtrl: NavController, public navParams: NavParams, public push: Push) {

        this.titlestyelClass="welcome_"+OrderService.lang;

  // this.latestNotification={title:"سباك محصلش",body:"دلوقتى تقدر تعمل احسن سباكة بخصم 20% فى الميه لو اتكلمت دلوقتى حالا",isReaded:0,date:'22-10-2015'};

      this.push.rx.notification()
      .subscribe((msg) => {
        alert('recieved');
        console.log(msg);
        // this.navCtrl.push(OffersPage);
        
       let notification:Notification=new Notification();
       notification.title=msg.title;
       notification.body=msg.text;
        AppSqlTableService.CreateNotificationTableIFnOTeXIST().then(()=>{
           AppSqlTableService.insertNewNotification(notification).then(()=>{
             WelcomePage.latestNotification=notification;
             console.log(WelcomePage.latestNotification);
          AppSqlTableService.countNotificationsBasedOnState('new').then((data)=>{
        if(data.rows.length>0){
   WelcomePage.numberOfUnreadedNotification=data.rows.length;
        }
   
      }).catch((error)=>{

      });

           })
        });

      });

WelcomePage.getUnReadedNottifications()

      
    
  }

   static getUnReadedNottifications(){
          AppSqlTableService.countNotificationsBasedOnState('new').then((data)=>{
        if(data.rows.length>0){
   WelcomePage.numberOfUnreadedNotification=data.rows.length;
   Badge.set(WelcomePage.numberOfUnreadedNotification);
           WelcomePage.latestNotification={ title: data.rows.item(0).title, body: data.rows.item(0).body, date: "", isReaded: 0 };

     
        }
   
      }).catch((error)=>{

      });

  }

  ionViewDidLoad() {
        Splashscreen.hide();

    this.bounceState = 'bouncing';  
  
    this.flipState="flipped";
    this.flyState = 'out';
 
    // setInterval(() => {
    //   this.flyState = 'in';
    // }, 500);

  setInterval(() => {
    this.fadeState =  'visible'; 
    setTimeout(()=>{
this.flyState="in";
    },800)

    }, 300);
    console.log('ionViewDidLoad WelcomePage');
  }

  goToNewOrder(){
  this.navCtrl.push(GetLocationPage);
  }

  goToHowToUse(){
  this.navCtrl.push(HowToUsePage);

  }
goToContactUs(){
  this.navCtrl.push(ContactUsPage);

}

openNotifications(){
    this.navCtrl.push(OffersPage);
    Badge.clear();


}

get staticNumberOfUnreadedNotification() {
    return WelcomePage.numberOfUnreadedNotification
  }

  get staticLatestNotification() {
    return WelcomePage.latestNotification
  }
}
