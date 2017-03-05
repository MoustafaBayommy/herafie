import { Component ,Input} from '@angular/core';
import { Nav } from 'ionic-angular';

import    * as config   from '../../herafie.config.ts';
import { ContactUsPage } from '../../pages/pages';
import { CostsPage }from '../../pages/pages';
import { GetFreeChargePage } from '../../pages/pages';
import { HowToUsePage }from '../../pages/pages';
import { MyordersPage } from '../../pages/pages';
import { OffersPage } from '../../pages/pages';
import { RulesPage } from '../../pages/pages';
import { SettingsPage } from '../../pages/pages';
import { AboutAppPage } from '../../pages/pages';
// import { CategoriesPage } from '../pages/pages';
import { GetLocationPage } from '../../pages/pages';
import { MainPage } from '../../pages/pages';
// import { PickDatePage } from '../pages/pages';
import { RegisterPage } from '../../pages/pages';
// import { ServicesPage } from '../pages/pages';
import { WelcomePage } from '../../pages/pages';
import { RatingPage } from '../../pages/pages';
import {OrderService} from '../../providers/order.server'
interface Menu{
  id:number,
  title:string,
  icon:string,
  pageName:any

}
/*
  Generated class for the Place directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Component({
  selector: 'menuCompo' // Attribute selector
  ,templateUrl:'menu.html'
})
export class MenuComponent {
@Input()
nav:Nav;
@Input()
content:any;
  menuIteams:Menu[]=[
      {id:0,title:'menu.home',icon:'apps',pageName:WelcomePage},
  {id:0,title:'menu.newOrder',icon:'paper',pageName:GetLocationPage},
  {id:0,title:'menu.myOrders',icon:'cart',pageName:MyordersPage},
  // {id:0,title:'الأسعار',icon:'cash',pageName:CostsPage},
  // {id:0,title:'العروض',icon:'cash',pageName:OffersPage},
  // {id:0,title:'إحصل على رصيد مجانى',icon:'md-checkbox-outline',pageName:GetFreeChargePage},
  {id:0,title:'menu.howToUse',icon:'options',pageName:HowToUsePage},
  {id:0,title:'menu.rate',icon:'star-half',pageName:RatingPage},

  // {id:0,title:'الشروط والأحكام',icon:'list-box',pageName:RulesPage},
  {id:0,title:'menu.contactUs',icon:'map',pageName:ContactUsPage},
  {id:0,title:'menu.settings',icon:'cog',pageName:SettingsPage},
  // {id:0,title:'تسجيل الخروج',icon:'log-out',pageName:''},
    {id:0,title:'menu.aboutApp',icon:'sunny',pageName:AboutAppPage}



  ];


   titlestyelClass:string;

  constructor() {
    this.titlestyelClass=OrderService.lang=='ar'?"iteam_ar":"iteam_en";


  }

  menuPage(menu:Menu) {
         if(menu.pageName==WelcomePage||menu.pageName==GetLocationPage){
         this.nav.setRoot(menu.pageName);
         }else{
                    this.nav.push(menu.pageName);
         }

  }

}
