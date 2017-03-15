import { Component } from '@angular/core';
import { NavController,ViewController, NavParams, LoadingController, AlertController, Platform,ModalController} from 'ionic-angular';
import { RegisterPage } from '../pages';
// import {LoadingModal} from '../../components/loading-modal/loading-modal';
import { GetLocationPage } from '../pages';
import { MainPage } from '../pages';
import { Countries } from './countries';

import { Order } from '../order';
import { LoginService } from './login.service';
import { SQLite, Splashscreen } from 'ionic-native';

import { OrderService } from '../../providers/order.server';
import { VerifiyNumberService } from '../../providers/verifiyNumber.service';

import { AppSqlTableService } from '../../providers/app-sql-table-service';

import { User } from '../../models/user';
import { WelcomePage } from '../pages';

import { trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation
import { TranslateService } from 'ng2-translate';


import * as config from '../../herafie.config.ts';





/*
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
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
  ]
})
export class LoginPage {
  appTitle: string;
  appsubTitle: string;
  static phone: string;
  password: string;
  perid: number = 1000000;
  isFirstTime: boolean = true;
  mobilNumber: number;
  countryCode: string = '+20';
  // +966
  //+20
  static loader;
  static stnavCtrl;
  static staticPlatForm: Platform;
  static sstaticAlert: AlertController;
  titlestyelClass: string;
  lang: string;
  bounceState: String = "noBounce";
  loadingDisplay: string = "none";
  verifiyDisplay: string = "block";
  mainDisplay: string = "none";
  code: string;
  loadingsrc: string = "assets/svg/ring.svg";
    flagName: string = "assets/svg/egypt.svg";

  verifybuttonEnabled: boolean = true;
  sendingError:boolean=false;
  sendEnabled:boolean=false;
 static translateStatic:TranslateService;
  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loginService: LoginService,
    public platform: Platform,
    orderService: OrderService,
    public appSqlTableService: AppSqlTableService,
    public verifyService: VerifiyNumberService,
     public  translate:TranslateService
  ) {
    this.lang = OrderService.lang;
    this.titlestyelClass = "login_" + OrderService.lang;
    this.appTitle = config.data.appTitle;
    this.appsubTitle = config.data.appSubTitle;
     

    LoginPage.staticPlatForm = this.platform;
    LoginPage.sstaticAlert = this.alertCtrl;
LoginPage.translateStatic=this.translate;

      LoginPage.translateStatic.get('login.loading.message').subscribe(
  value => {
   LoginPage.loader = this.loadingCtrl.create({
      content:value
    });

        });
  

    LoginPage.stnavCtrl = this.navCtrl;
    //         this.platform.ready().then(() => {



    



  }

  ionViewDidLoad() {
    this.bounceState = 'bouncing';

    Splashscreen.hide();

    console.log('ionViewDidLoad LoginPage');

  }




  static signup() {
    LoginPage.stnavCtrl.push(RegisterPage, { 'mobile': LoginPage.phone });
  }


  static gotoNextScreen() {
    LoginPage.stnavCtrl.setRoot(WelcomePage);
    // LoginPage.stnavCtrl.setRoot(MainPage);

  }





  static craeteUserInTableThenLogeed() {

    AppSqlTableService.insertNewUser(OrderService.user).then((data) => {

      console.log('creat new user in database ');
      LoginPage.loader.dismiss();
      LoginPage.gotoNextScreen();

    }, (error) => {
      console.error("Unable to execute sql", error);
    });



  }


  static loginCallback(mobile) {
    if(typeof OrderService.user=='undefined'||OrderService.user==null){
       OrderService.user=new User();
    }
        OrderService.user.mobile =mobile.substring(1);
        LoginPage.loader.present();
        LoginService.isUser(`${OrderService.user.mobile}`).then(result => {
          console.log('result returned From Server ' + result);

          if (result.isClient === 'true') {
           OrderService.user.name=result.name;
           OrderService.user.neighborhood=result.neighborhood;
            OrderService.user.email=result.email;
            OrderService.user.notifiy=(result.notifiy==='1');
            console.log('the user is already register ');

            LoginPage.craeteUserInTableThenLogeed()
          } else {
            console.log('the user is never register ');
            LoginPage.loader.dismiss();
            LoginPage.signup();
          }

        }, err => {


       LoginPage.translateStatic.get('login.alert').subscribe(
  value => {
 LoginPage.loader.dismiss();
 LoginPage.erroralert(value.networkError);

        });
        })


    
 

  }









  static erroralert(message: string) {
    let alert = LoginPage.sstaticAlert.create({
      title: message,
      subTitle: ''
    });
    alert.present();
    setTimeout(function () {
      alert.dismiss();
      LoginPage.staticPlatForm.exitApp();
    }, 5000)
  }

  sendMessage() {
    this.sendingError=false;

 let mobile=this.countryCode+this.mobilNumber;
    console.log(this.countryCode+""+this.mobilNumber)
          this.loadingsrc = "assets/svg/ring.svg";
    this.mainDisplay = "none";
    this.loadingDisplay = "block";
    // setTimeout(() => {
    //   this.loadingsrc = "assets/svg/correct.svg";
    //   this.verifiyDisplay = "block";
    //   this.loadingDisplay = "none";

    // }, 1000)
    this.verifyService.sendVeifyCode(mobile,this.lang).then((response)=>{
if(response.sent=='true'){
      this.loadingsrc = "assets/svg/correct.svg";
          setTimeout(() => {
          this.verifiyDisplay = "block";
      this.loadingDisplay = "none";
    }, 1000)

}else{
        this.loadingsrc = "assets/svg/error.svg";
this.sendingError=true;
}
    }).catch((e)=>{
        this.loadingsrc = "assets/svg/error.svg";
this.sendingError=true;

    });
  }

  enableverifyButton() {
    this.verifybuttonEnabled =(this.code+"").length != 4;
  }


  resent() {
    this.verifiyDisplay = "none";
    this.loadingDisplay = "none";
    this.mainDisplay = "block";
    this.code='';

  }

  viewCountries(){
    console.log('fgdh');
  let modal = this.modalCtrl.create(Countries);
    modal.onDidDismiss(code => {
      console.log(code);
            if(code=='0'){

      }else{
        if(code=='+20'){
this.flagName="assets/svg/egypt.svg";
        }else{
this.flagName="assets/svg/saudi.svg";
        }
        this.countryCode=code;
      }
   });
    modal.present();
  }

verifyCode(){
    console.log(this.code);
      this.loadingsrc = "assets/svg/ring.svg";

      this.verifyService.verifyCode(this.countryCode+this.mobilNumber,this.code).then((response)=>{
        console.log(response);
if(response.verified=='true'){
      this.loadingsrc = "assets/svg/correct.svg";
      this.verifiyDisplay = "block";
      this.loadingDisplay = "none";
      setTimeout(()=>{
LoginPage.loginCallback(this.countryCode+this.mobilNumber);
      },1000)
      
}else{
      this.loadingsrc = "assets/svg/error.svg";


}
    }).catch((e)=>{
      this.loadingsrc = "assets/svg/error.svg";

    });
}
enablesendbutton(){
 this.sendEnabled=(this.mobilNumber+"").length>4;
   
 
}

}


