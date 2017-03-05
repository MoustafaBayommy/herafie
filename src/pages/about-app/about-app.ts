import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation
import { OrderService } from '../../providers/order.server';

/*
  Generated class for the AboutApp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about-app',
  templateUrl: 'about-app.html',
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
    
    ]
})
export class AboutAppPage {
appTitle:string;
  appsubTitle:string;
  public titlestyelClass;
  bounceState:String="noBounce";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

        this.titlestyelClass="about_"+OrderService.lang;

  }

  ionViewDidLoad() {
        this.bounceState = 'bouncing';  

    console.log('ionViewDidLoad AboutAppPage');
  }

}
