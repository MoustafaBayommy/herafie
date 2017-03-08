import { NgModule, ErrorHandler} from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CategoriesPage } from '../pages/pages';
import { GetLocationPage } from '../pages/pages';
import { LoginPage } from '../pages/pages';
import { MainPage } from '../pages/pages';
import { PickDatePage } from '../pages/pages';
import { RegisterPage } from '../pages/pages';
import { ServicesPage } from '../pages/pages';
import { WelcomePage } from '../pages/pages';
import { RatingPage } from '../pages/pages';
import { Ionic2RatingModule } from 'ionic2-rating';
// import { DatePickerModule } from 'ng2-datepicker';
import {HttpModule}from '@angular/http';
import {AdressService} from '../pages/pages';
import {PlaceDirective} from '../components/place/place'
import {LoginService} from '../pages/login/login.service.ts'
import {OrderService} from '../providers/order.server';
import {MyOrdersService} from '../providers/myorders.service';
import {VerifiyNumberService} from '../providers/verifiyNumber.service';

import {ConnectivityService} from '../providers/connectivity-service';
import { AppSqlTableService } from '../providers/app-sql-table-service';

import { ContactUsPage } from '../pages/pages';
import { CostsPage }from '../pages/pages';
import { GetFreeChargePage } from '../pages/pages';
import { HowToUsePage }from '../pages/pages';
import { MyordersPage } from '../pages/pages';
import { OffersPage } from '../pages/pages';
import { RulesPage } from '../pages/pages';
import { SettingsPage } from '../pages/pages';
import { AboutAppPage } from '../pages/pages';
import { LoadingPagePage } from '../pages/pages';
import { Countries } from '../pages/login/countries';

// import {LoadingModal} from '../components/loading-modal/loading-modal';

import {DonePropOverPage} from '../pages/done-prop-over/done-prop-over';
import {HerafieNavComponnent} from '../components/herafieNav/herafieNav.component';
import {MenuComponent} from '../components/menu/menu.component';
import {TranslateModule,TranslateStaticLoader,TranslateLoader} from 'ng2-translate/ng2-translate';
import {Http}from '@angular/http';


export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    CategoriesPage,
    GetLocationPage
,LoginPage,
MainPage,
PickDatePage,
RegisterPage,
ServicesPage,
WelcomePage ,
RatingPage,
PlaceDirective,
ContactUsPage,
CostsPage,
GetFreeChargePage,
HowToUsePage,
MyordersPage,
OffersPage,
RulesPage,
SettingsPage,
DonePropOverPage,AboutAppPage
,HerafieNavComponnent,
MenuComponent,
LoadingPagePage,
Countries
// LoadingModal
 ],
  imports: [
    IonicModule.forRoot(MyApp),Ionic2RatingModule, 
    HttpModule,
        TranslateModule.forRoot(
          {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }
        )


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  LoginPage,
    RegisterPage,
    MainPage,
    ServicesPage, 
    CategoriesPage,
    PickDatePage,
    RatingPage,
    GetLocationPage,
    ContactUsPage,
CostsPage,
GetFreeChargePage,
HowToUsePage,
MyordersPage,
OffersPage,
RulesPage,
SettingsPage,
WelcomePage,
DonePropOverPage,AboutAppPage
    ,HerafieNavComponnent
  ,MenuComponent,
  LoadingPagePage,
  Countries
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},AdressService,LoginService,OrderService,MyOrdersService
  ,ConnectivityService,AppSqlTableService,VerifiyNumberService
  ]
})
export class AppModule {}
