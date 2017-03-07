import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation
import { OrderService } from '../../providers/order.server';

/*
  Generated class for the LoadingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-loading-page',
  templateUrl: 'loading-page.html' , animations:  [
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
  ]
})
export class LoadingPagePage {
bounceState:String="noBounce";
titlestyelClass:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

            this.titlestyelClass="loading_"+OrderService.lang;

  }

  ionViewDidLoad() {
        this.bounceState = 'bouncing';  

    console.log('ionViewDidLoad LoadingPagePage');
  }

}
