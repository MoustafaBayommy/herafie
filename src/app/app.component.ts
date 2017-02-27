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
// import { PickDatePage } from '../pages/pages';
import { RegisterPage } from '../pages/pages';
// import { ServicesPage } from '../pages/pages';
import { WelcomePage } from '../pages/pages';
import { RatingPage } from '../pages/pages';
import    * as config   from '../herafie.config.ts';
// import {SQLite} from 'ionic-native';



interface Menu{
  id:number,
  title:string,
  icon:string,
  pageName:any

}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  menuIteams:Menu[]=[
      {id:0,title:'الرئيسية',icon:'apps',pageName:WelcomePage},
  {id:0,title:'طلب جديد',icon:'paper',pageName:GetLocationPage},
  {id:0,title:'طلباتى',icon:'cart',pageName:MyordersPage},
  // {id:0,title:'الأسعار',icon:'cash',pageName:CostsPage},
  // {id:0,title:'العروض',icon:'cash',pageName:OffersPage},
  // {id:0,title:'إحصل على رصيد مجانى',icon:'md-checkbox-outline',pageName:GetFreeChargePage},
  {id:0,title:'طريقة الإستخدلم',icon:'options',pageName:HowToUsePage},
  {id:0,title:'تقييم',icon:'star-half',pageName:RatingPage},

  // {id:0,title:'الشروط والأحكام',icon:'list-box',pageName:RulesPage},
  {id:0,title:'إتصل بنا',icon:'map',pageName:ContactUsPage},
  {id:0,title:'الإعدادت',icon:'cog',pageName:SettingsPage},
  // {id:0,title:'تسجيل الخروج',icon:'log-out',pageName:''},
    {id:0,title:'عن التطبيق',icon:'sunny',pageName:AboutAppPage}



  ];





  appTitle:string;
  appsubTitle:string;
  rootPage: any =LoginPage;


  constructor(public platform: Platform) {
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

  menuPage(menu:Menu) {
         
         this.nav.setRoot(menu.pageName);

  }


  
}
