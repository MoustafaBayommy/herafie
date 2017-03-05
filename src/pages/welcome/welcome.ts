import { Component } from '@angular/core';
import {trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation

import { NavController, NavParams } from 'ionic-angular';
import    * as config   from '../../herafie.config.ts';
import { ContactUsPage } from '../pages';
import { HowToUsePage }from '../pages';
import { GetLocationPage } from '../pages';
import { OrderService } from '../../providers/order.server';

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
      transition('in => out', animate('100ms ease-in')),
      transition('out => in', animate('100ms ease-out'))
    ])
  ,
      trigger('bounce', [
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

        this.titlestyelClass="welcome_"+OrderService.lang;

  }

  ionViewDidLoad() {
    
    this.bounceState = 'bouncing';  
  
    this.flipState="flipped";
    this.flyState = 'out';
 
    // setInterval(() => {
    //   this.flyState = 'in';
    // }, 500);

  setInterval(() => {
    this.fadeState =  'visible'; 

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
}
