import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrderService } from '../../providers/order.server';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation

/*
  Generated class for the HowToUse page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-how-to-use',
  templateUrl: 'how-to-use.html',
   animations:[    trigger('bounce', [
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
    ]
})
export class HowToUsePage {
appTitle:string;
  appsubTitle:string;
     titlestyelClass:string;
  bounceState: String = "noBounce";
  flayState0: string = "out";
  flayState1: string = "out";
  flayState2: string = "out";
  flayState3: string = "out";
  flayState4: string = "out";
  flayState5: string = "out";
    flayState6: string = "out";
  flayState7: string = "out";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.titlestyelClass="usage_"+OrderService.lang;

  }

  ionViewDidLoad() {

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
     setTimeout(() => {
this.flayState6='in';
     setTimeout(() => {
this.flayState7='in';

    }, 300);
    }, 300);
    }, 300);
    }, 300);
    }, 300);
    }, 300);
    }, 300);
    }, 200);
    this.bounceState = 'bouncing';
    console.log('ionViewDidLoad HowToUsePage');
  }

}
