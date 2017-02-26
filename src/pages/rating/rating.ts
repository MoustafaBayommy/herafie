import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,Platform ,LoadingController,PopoverController} from 'ionic-angular';
import    {Rate}  from '../../models/rate';
import    {User}  from '../../models/user';

import    {MyOrdersService}  from '../../providers/myorders.service';
import    {OrderService}  from '../../providers/order.server';

import {DonePropOverPage} from '../done-prop-over/done-prop-over';
import {ContactUsPage} from '../contact-us/contact-us';
/*
  Generated class for the Rating page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html'
})
export class RatingPage {
 appTitle:string;
  appsubTitle:string;

  rate:Rate;
   appRate:number;
   delegateRate:number;
   techRate:number;
   notes:string;
  loader:any;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
   public loadingCtrl: LoadingController,
   public alertCtrl: AlertController,
   public popoverCtrl: PopoverController,
  public ratingservice:MyOrdersService ) {
   this.rate=new Rate();
   this.rate.appRate=1;
   this.rate.agentRate=1;
  this.rate.techRate=1;

  OrderService.user=new User();
   OrderService.user.mobile='01000';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingPage');
  }

  sendRate(){
     this.loader = this.loadingCtrl.create({
      content: "جارى أرسال طلبكم...انتظر رجاء"
    });
this.loader.present();
this.rate.client=OrderService.user.mobile;
this.ratingservice.sendRating(this.rate).then(response=>{
  if(response.sucess==='true'){
  this.loader.dismiss();
   this.doneAlert();
   this.navCtrl.setRoot(ContactUsPage);
  //  this.showDoneToast();
  }else{
     this.loader.dismiss();
this.showErrorAlert('حدث خطأ اثناء ارسال طلبك  حاول مجددا');  ;
  }
}).catch(ex=>{
  this.loader.dismiss();
this.showErrorAlert('تاكد من اتصال الشبكة ثم حاول مجد');  

});

  }


     showErrorAlert(message:string) {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle:message,
      buttons: ['عُلم']
    });
    alert.present();
  }

doneAlert() {
 
 
   let popover = this.popoverCtrl.create(DonePropOverPage);
    popover.present();
      //  this.gotoNextScreen();

    setTimeout(()=>{
    popover.dismiss();

    },2000);

  }
}
