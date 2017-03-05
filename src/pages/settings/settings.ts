import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import    * as config   from '../../herafie.config.ts';
import {trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation
import { OrderService } from '../../providers/order.server';
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
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
      ]),
      
    ])
    ,     trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0.1
      })),
      transition('visible <=> invisible', animate('200ms linear'))
    ]),
 
    ]
})
export class SettingsPage {
appTitle:string;
  appsubTitle:string;
  notifiy:boolean;
    public titlestyelClass;
  bounceState:String="noBounce";
    fadState:String="invisible";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
this.notifiy=true;
  this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;
        this.titlestyelClass="setting_"+OrderService.lang;

  }

  ionViewDidLoad() {
        this.bounceState = 'bouncing';  
        setTimeout(()=>{
this.fadState='visible';
        },200);
    console.log('ionViewDidLoad AboutAppPage');
  }

}
