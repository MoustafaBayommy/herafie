import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import    * as config   from '../../herafie.config.ts';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
appTitle:string;
  appsubTitle:string;
  notifiy:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
this.notifiy=true;
  this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
