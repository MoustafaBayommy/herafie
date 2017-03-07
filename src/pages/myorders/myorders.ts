import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import {Order} from '../../models/order';
import {MyOrdersService} from '../../providers/myorders.service';
import {OrderService} from '../../providers/order.server';
import { WelcomePage } from '../pages';
import { GetLocationPage } from '../pages';

import {MainPage} from '../main/main';
import {TranslateService} from 'ng2-translate';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation

/*
  Generated class for the Myorders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-myorders',
  templateUrl: 'myorders.html',
  animations: [trigger('bounce', [
    state('bouncing', style({
      transform: 'translate3d(0,0,0)'
    })),
    transition('* => bouncing', [
      animate('1000ms ease-in', keyframes([
        style({ transform: 'translate3d(0,0,0)', offset: 0 }),
        style({ transform: 'translate3d(0,-10px,0)', offset: 0.5 }),
        style({ transform: 'translate3d(0,0,0)', offset: 1 })
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
    ]),
  ]
})
export class MyordersPage {
appTitle:string;
  appsubTitle:string;
  orders:Order[];
  loader;
    bounceState: String = "noBounce";
    fadeState: String = "invisible";


  noConnectionDisplay:string='none';
     titlestyelClass:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public myorders:MyOrdersService
  ,public alertCtrl: AlertController,
  public loadingCtrl: LoadingController,
  public translate:TranslateService
  ) {
    
            this.titlestyelClass="myOrders_"+OrderService.lang;

  }

  ionViewDidLoad() {

    this.bounceState = 'bouncing';

       this.translate.get('myOrders.loadingMessage').subscribe(
  value => {

      this.loader = this.loadingCtrl.create({
      content:value
    });
this.loader.present();
   this.displayOrders();
        });

  }

  showAlert() {

           this.translate.get('myOrders.alert').subscribe(
  value => {


    let alert = this.alertCtrl.create({
      title: '',
      subTitle:value.networkError,
      buttons: [value.alertButton]
    });
    alert.present();

        });

    
  }  
 
   TestConnectionAgain(){

       this.translate.get('myOrders.loadingMessage').subscribe(
  value => {

      this.loader = this.loadingCtrl.create({
      content:value
    });
this.loader.present();
   this.displayOrders();
        });
  }

   displayOrders(){
     console.log('geting orders....');
    //  '201090965098'
 this.myorders.getMyOrders(OrderService.user.mobile).then(orders=>{
     console.log('displaying orders....')
   
    this.orders=orders;
    console.log(this.orders);
 for(var i=0;i<  this.orders.length;i++){
     if( this.orders[i].orderStutes==='served'){
        this.orders[i].styleclass='served';
// serving
     }else if( this.orders[i].orderStutes==='rejected'){
        this.orders[i].styleclass='rejected';
     }else{
        this.orders[i].styleclass='inProgress';

     }
    }
    this.noConnectionDisplay='none';

    this.loader.dismiss();
setTimeout(()=>{
this.fadeState="visible";
},150);

  
}, (err) => {

       console.log('cant orders');

           this.loader.dismiss();
          //  this.showAlert();
          //  this.navCtrl.push(MainPage);

          this.noConnectionDisplay='block';
    });


    console.log('don ');
   }

   newOrder(){
     this.navCtrl.setRoot(GetLocationPage)
   }

}
