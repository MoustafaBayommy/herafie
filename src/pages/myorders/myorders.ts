import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import    * as config   from '../../herafie.config.ts';
import {Order} from '../../models/order';
import {MyOrdersService} from '../../providers/myorders.service';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public myorders:MyOrdersService
  ,public alertCtrl: AlertController,
  public loadingCtrl: LoadingController,
  ) {
  this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;
    
  }

  ionViewDidLoad() {




      this.loader = this.loadingCtrl.create({
      content: "جارى تحميل احدث طلباتك..انتظر رجاء"
    });
this.loader.present();
    this.myorders.getMyOrders('').then(orders=>{

    this.orders=orders;
    this.loader.dismiss();

  
}, (err) => {
           this.loader.dismiss();
           this.showAlert();
           this.navCtrl.push(MainPage);
    });


    console.log('don ');
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: 'خطأ اثناء تحميل طلباتك برجاء التأكد من الإتصال بالشبكة',
      buttons: ['رجوع']
    });
    alert.present();
    
  }  
 

}
