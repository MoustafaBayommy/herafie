import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import {Order} from '../../models/order';
import {MyOrdersService} from '../../providers/myorders.service';
import {OrderService} from '../../providers/order.server';
import { WelcomePage } from '../pages';
import { GetLocationPage } from '../pages';

import {MainPage} from '../main/main';

/*
  Generated class for the Myorders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-myorders',
  templateUrl: 'myorders.html'
})
export class MyordersPage {
appTitle:string;
  appsubTitle:string;
  orders:Order[];
  loader;

  noConnectionDisplay:string='none';

  constructor(public navCtrl: NavController, public navParams: NavParams,public myorders:MyOrdersService
  ,public alertCtrl: AlertController,
  public loadingCtrl: LoadingController,
  ) {
    
    
  }

  ionViewDidLoad() {




      this.loader = this.loadingCtrl.create({
      content: "جارى تحميل احدث طلباتك..انتظر رجاء"
    });
this.loader.present();
   this.displayOrders();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: 'خطأ اثناء تحميل طلباتك برجاء التأكد من الإتصال بالشبكة',
      buttons: ['رجوع']
    });
    alert.present();
    
  }  
 
   TestConnectionAgain(){
         this.loader = this.loadingCtrl.create({
      content: "جارى تحديد موقعك...انتظر رجاء"
    });
    this.loader.present();
  //  this.loadMapSdk();
  this.displayOrders();
  }

   displayOrders(){
     console.log('geting orders....');
    //  OrderService.user.mobile
 this.myorders.getMyOrders('201090965098').then(orders=>{
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
