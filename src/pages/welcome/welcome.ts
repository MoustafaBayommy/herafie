import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import    * as config   from '../../herafie.config.ts';
import { ContactUsPage } from '../pages';
import { HowToUsePage }from '../pages';
import { GetLocationPage } from '../pages';

/*
  Generated class for the Welcome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  goToNewOrder(){
  this.navCtrl.setRoot(GetLocationPage);
  }

  goToHowToUse(){
  this.navCtrl.setRoot(HowToUsePage);

  }
goToContactUs(){
  this.navCtrl.setRoot(ContactUsPage);

}
}
