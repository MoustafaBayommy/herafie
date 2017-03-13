import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/pages';
import { ContactUsPage } from '../pages/pages';
import { CostsPage }from '../pages/pages';
import { GetFreeChargePage } from '../pages/pages';
import { HowToUsePage }from '../pages/pages';
import { MyordersPage } from '../pages/pages';
import { OffersPage } from '../pages/pages';
import { RulesPage } from '../pages/pages';
import { SettingsPage } from '../pages/pages';
import { AboutAppPage } from '../pages/pages';
// import { CategoriesPage } from '../pages/pages';
import { GetLocationPage } from '../pages/pages';
import { MainPage } from '../pages/pages';
import { PickDatePage } from '../pages/pages';
import { RegisterPage } from '../pages/pages';
// import { ServicesPage } from '../pages/pages';
import { WelcomePage } from '../pages/pages';
import { RatingPage } from '../pages/pages';
import    * as config   from '../herafie.config.ts';
// import {SQLite} from 'ionic-native';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {OrderService} from '../providers/order.server';
import { LoadingPagePage } from '../pages/pages';
import { AppSqlTableService } from '../providers/app-sql-table-service';
import { User } from '../models/user';
import { Push, PushToken} from '@ionic/cloud-angular';



@Component({
  templateUrl: 'app.html',
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;





  appTitle:string;
  appsubTitle:string;
  rootPage: any =WelcomePage;


  constructor(public platform: Platform, public translate: TranslateService,public appSqlTableService: AppSqlTableService,public push: Push) {
    console.log(navigator.language.split('-')[0]);
    OrderService.lang=navigator.language.split('-')[0];
OrderService.lang="ar";
this.translate.use(OrderService.lang);
    this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;
    this.initializeApp();


  }


  initializeApp() {
    this.platform.ready().then(() => {
       StatusBar.styleDefault();
this.test();
    //    this.push.register().then((t: PushToken) => {
    //     return this.push.saveToken(t);
    //   }).then((t: PushToken) => {
    //     console.log('Token saved:', t.token);
    //   });
    

    //    AppSqlTableService.openDataBase().then(()=>{
    //     AppSqlTableService.CreateTableIFnOTeXIST().then((data) => {

    //       console.log('open database and test if table exist ' + data);

    //         this.isUserAlreadyLogged();
      
    //     }, (error) => {
    //       console.error("Unable to execute sql", error);
    //       this.platform.exitApp();
    //     });
    // }
    // );
       });

   
    // });
  }


test(){
                  this.nav.setRoot(PickDatePage);
      Splashscreen.hide(); 

}


  isUserAlreadyLogged() {
    AppSqlTableService.selectAll().then((data) => {
      console.log('returned Data from sqlLite ' + data.rows);
      if (data.rows.length > 0) {
        //  for(var i = 0; i < data.rows.length; i++) {
        //                 this.people.push({firstname: data.rows.item(0).firstname, lastname: data.rows.item(i).lastname});
        //             }
        console.log('user ', data.rows.item(0).mobil, ' Logged In Before');
        //so user loged before
        //set current user data
        var currentUser: User = new User();
        currentUser.mobile = data.rows.item(0).mobil;
        // currentUser
        OrderService.user = currentUser;
       this.nav.setRoot(WelcomePage);
      } else {

         this.nav.setRoot(LoginPage);

        console.log('new User Try to Login');

        //so its first log may register or not that what we will check
        //first test if that is its number using fb account Kit
      }
    }, (error) => {
      console.error("Unable to execute sql", error);
    });


  }

  
}
