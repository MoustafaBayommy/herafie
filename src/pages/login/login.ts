import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { RegisterPage } from '../pages';
// import {LoadingModal} from '../../components/loading-modal/loading-modal';
import { GetLocationPage } from '../pages';
import { MainPage } from '../pages';

import { Order } from '../order';
import { LoginService } from './login.service';
import { SQLite } from 'ionic-native';

import { OrderService } from '../../providers/order.server';
import { AppSqlTableService } from '../../providers/app-sql-table-service';

import { User } from '../../models/user';
import { WelcomePage } from '../pages';




import * as config from '../../herafie.config.ts';


declare var AccountKit: any;
declare var FacebookAccountKit: any;
//  declare var AccountKit_OnInteractive:any;


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  template: ''
  // templateUrl: 'login.html'
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

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginService: LoginService,
    public platform: Platform,
    orderService: OrderService,
    public appSqlTableService: AppSqlTableService
  ) {
    this.appTitle = config.data.appTitle;
    this.appsubTitle = config.data.appSubTitle;


    LoginPage.staticPlatForm = this.platform;
    LoginPage.sstaticAlert = this.alertCtrl;

    LoginPage.loader = this.loadingCtrl.create({
      content: "جارى تسجيل الدخول...انتظر رجاء"
    });

    LoginPage.stnavCtrl = this.navCtrl;
        this.platform.ready().then(() => {
     
   
 
AppSqlTableService.openDataBase().then(()=>{
    AppSqlTableService.CreateTableIFnOTeXIST().then((data) => {

      console.log('open database and test if table exist ' + data);

      if (typeof FacebookAccountKit != 'undefined' && FacebookAccountKit != null) {
        this.isUserAlreadyLogged();
      } else {
        this.showAlert();
        this.platform.exitApp();
      }
    }, (error) => {
      console.error("Unable to execute sql", error);
      this.showAlert();
      this.platform.exitApp();
    });
}
);
   });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }



  showFaceBookAccountKit() {

    OrderService.user = new User();

    //native
    FacebookAccountKit.mobileLogin(function (response) {
      console.log(JSON.stringify(response));
      LoginPage.loginCallback(response);
    }, function (error) {

      console.log(error);

    });


    //web
    // // AccountKit_OnInteractive();
    // //     AccountKit.login("PHONE",{
    // //        countryCode: this.countryCode, phoneNumber: this.mobilNumber
    // //     },this.loginCallback);

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


  static loginCallback(response) {
    if (typeof response != 'undefined' && response != null) {
      if (typeof response.mobile != 'undefined' && response.mobile != null && response.mobile.length > 0) {
        OrderService.user.mobile = response.mobile.substring(1);
        LoginPage.loader.present();
        LoginService.isUser(`${OrderService.user.mobile}`).then(result => {
          console.log('result returned From Server ' + result);

          if (result.isClient === 'true') {
            console.log('the user is already register ');

            LoginPage.craeteUserInTableThenLogeed()
          } else {
            console.log('the user is never register ');
            LoginPage.loader.dismiss();
            LoginPage.signup();
          }

        }, err => {
          LoginPage.fbAccountFailedAlert('تاكد من اتصال الإنترنت ... جارى الخروج من التطبيق');
        })


      } else {
        //do some thing when response not defined
        LoginPage.fbAccountFailedAlert('لم يتم تأكيد الجوال بصوره صحيحة ... جارى الخروج من التطبيق');

      }
    } else {
      //do some thing when mobil not defined mean he hit cancel in try again in fb acount
      LoginPage.fbAccountFailedAlert('لم يتم تأكيد الجوال بصوره صحيحة ... جارى الخروج من التطبيق');

    }


  }




  isUserAlreadyLogged() {
    AppSqlTableService.selectAll().then((data) => {
      console.log('returned Data from sqlLite '+data.rows);
      if (data.rows.length  > 0) {
    //  for(var i = 0; i < data.rows.length; i++) {
    //                 this.people.push({firstname: data.rows.item(0).firstname, lastname: data.rows.item(i).lastname});
    //             }
        console.log('user ',  data.rows.item(0).mobil, ' Logged In Before');
        //so user loged before
        //set current user data
        var currentUser: User = new User();
        currentUser.mobile =  data.rows.item(0).mobil;
        // currentUser
        OrderService.user = currentUser;
        LoginPage.loader.dismiss();
        LoginPage.gotoNextScreen();
      } else {
        console.log('new User Try to Login');

        //so its first log may register or not that what we will check
        //first test if that is its number using fb account Kit
        LoginPage.loader.dismiss();
        this.showFaceBookAccountKit();
      }
    }, (error) => {
      console.error("Unable to execute sql", error);
    });


  }


  showAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: ' تأكد من اتصال الانترنت  ثم حاول مجددا',
      buttons: ['رجوع']
    });
    alert.present();
  }


  static fbAccountFailedAlert(message: string) {
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
}




var AccountKit_OnInteractive = function () {
  AccountKit.init(
    {
      appId: 1079156802213194,
      state: "Y1234",
      version: "v1.1" // We are using Account Kit which is version 1.0
    }
  );
};