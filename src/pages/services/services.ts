import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriesPage } from '../pages';
import { Order } from '../order';
import * as config from '../../herafie.config.ts';
import { OrderService } from '../../providers/order.server';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation




interface Col {

  id: number,
  title: string,
  name: string,
  iconName: string,
  className: string

}
/*
  Generated class for the Services page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
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
export class ServicesPage {
  appTitle: string;
  appsubTitle: string;
  selectedService: Col = {
    id: 0,
    name: 'قسم الصيانة',
    title: '',
    iconName: 'icon-verification-of-delivery-list-clipboard-symbol',
    className: 'itemActive'

  };
  rows: [Col[]];
   titlestyelClass:string;
 bounceState: String = "noBounce";
  fadeState: String = "invisible";
  constructor(public orderService: OrderService, public navCtrl: NavController, public navParams: NavParams) {
   
    this.titlestyelClass="servicesubTitlr_"+OrderService.lang;

    console.log(OrderService.order.placetype);
    this.appTitle = config.data.appTitle;
    this.appsubTitle = config.data.appSubTitle;
    this.rows = [[{
      id: 0,
      title: 'mainservices.Maintenance.title',
      name: 'صيانة',
      iconName: 'fa-wrench',
      className: 'nonActive'

    }], [{
      id: 0,
      name: 'نظافة',
      title: 'mainservices.Clean.title',
      iconName: 'icon-carpetnew',
      className: 'nonActive'

    }
    ], [{
      id: 0,
      name: 'تشطيب وترميم',
      title: 'mainservices.Restoration_finishing.title',
      iconName: 'icon-key-1',
      className: 'nonActive'
    }], [{
      id: 0,
      name: 'إلكترونيات',
      title: 'mainservices.Electronics.title',
      iconName: 'icon-computernew',
      className: 'nonActive'
    }]

    ];


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
    this.bounceState ='bouncing';
    setTimeout(()=>{
  this.fadeState='visible';
    },700);
    console.log('ionViewDidLoad MainPage');
    console.log('clientAdress ' + this.navParams.get('clientAdress'));

  }

  selecteService(service: Col) {
    for (let row of this.rows) {
      for (let col of row) {
        col.className = "nonactive";
        if (col === service) {
          col.className = "itemActive";
        }
      }
    }

    this.selectedService = service;
    this.next();
    // console.log(place);
  }

  next() {
    // console.log(this.selectedPlace);
    OrderService.order.mainServceType = this.selectedService.name;
    this.navCtrl.push(CategoriesPage);
  }

}
