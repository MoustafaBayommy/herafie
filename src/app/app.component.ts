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




@Component({
  templateUrl: 'app.html',
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;





  appTitle:string;
  appsubTitle:string;
  rootPage: any =MainPage;


  constructor(public platform: Platform, public translate: TranslateService) {
    console.log(navigator.language.split('-')[0]);
    OrderService.lang=navigator.language.split('-')[0];
// OrderService.lang="ar";
this.translate.use(OrderService.lang);
    this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;
    this.initializeApp();


  }

  initializeApp() {

    
      
    this.platform.ready().then(() => {
       StatusBar.styleDefault();
      Splashscreen.hide(); 

   
    });
  }




  
}
