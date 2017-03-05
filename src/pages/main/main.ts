import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesPage } from '../pages';
import { Order } from '../../models/order';
import { User } from '../../models/user';

import * as config from '../../herafie.config.ts';

import { OrderService } from '../../providers/order.server';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation



interface Col {

  id: number,
  title: string,
  name: string,
  iconName: string,
  isSelected: boolean
}


/*
  Generated class for the Main page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
   animations: [trigger('bounce', [
    state('bouncing', style({
      transform: 'translate3d(0,0,0)'
    })),
    transition('* => bouncing', [
      animate('700ms ease-in', keyframes([
        style({ transform: 'translate3d(0,0,0)', offset: 0 }),
        style({ transform: 'translate3d(0,-10px,0)', offset: 0.5 }),
        style({ transform: 'translate3d(0,0,0)', offset: 1 })
      ]))
    ]),

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
export class MainPage {
  appTitle: string;
  appsubTitle: string;
  selectedPlace: Col = {
    id: 2,
    name: 'محلات تجارية',
    title: '',
    iconName: 'shopping-basket',
    isSelected: false

  };
  rows: [Col[]];
 titlestyelClass:string;
  bounceState: String = "noBounce";
  fadeState: String = "invisible";

  constructor(public orderService: OrderService, public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.titlestyelClass='pagessubTitlr_'+OrderService.lang;

    if (typeof OrderService.order == 'undefined' && OrderService.order == null) {
      OrderService.order = new Order();
      // OrderService.order.clientMobil='01000';
    }
    this.appTitle = config.data.appTitle;
    this.appsubTitle = config.data.appSubTitle;
    this.rows = [[
      {
        id: 2,
        name: 'محلات تجارية',
        title: 'places.shops',
        iconName: 'shopnew',
        isSelected: false

      }
      ,
      {
        id: 6,
        name: 'مطاعم',
      title: 'places.Restaurants',
        iconName: 'dinnernew',
        isSelected: false
      }
    ]
      , [{
        id: 0,
        name: 'شقه',
        title: 'places.Apartment',
        iconName: 'buildingnew',
        isSelected: false
      }
      ,
      {
        id: 1,
        name: 'فيلا',
        title: 'places.Villa',
        iconName: 'villa-1new',
        isSelected: false
      }
    ], [
      {
        id: 3,
        name: 'مبنى سكنى',
        title: 'places.building',
        iconName: 'd-buildingnew',
        isSelected: false
      }
      ,
      {
        id: 5,
        name: 'سكنى',
        title: 'places.Hotel',
        iconName: 'bednew',
        isSelected: false
      }
    ]

    ];





  }

  ionViewDidLoad() {
    this.bounceState ='bouncing';
    setTimeout(()=>{
  this.fadeState='visible';
    },700)
    console.log('ionViewDidLoad MainPage');
    console.log('clientAdress ' + this.navParams.get('clientAdress'));
  }


  placeSelected(place: Col) {
    for (let row of this.rows) {
      for (let col of row) {
        col.isSelected = false;
        if (col.id == place.id) {
          col.isSelected = true;
        }
      }
    }


    this.selectedPlace = place;
    console.log(place);
    this.next();

  }

  next() {
    // console.log(this.selectedPlace);

    OrderService.order.placetype = this.selectedPlace.name
    // this.navCtrl.push(ServicesPage,{'placetype':this.selectedPlace.name});
    this.navCtrl.push(ServicesPage);

  }

}
