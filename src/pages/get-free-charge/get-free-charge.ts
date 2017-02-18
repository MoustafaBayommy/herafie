import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import    * as config   from '../../herafie.config.ts';

/*
  Generated class for the GetFreeCharge page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-get-free-charge',
  templateUrl: 'get-free-charge.html'
})
export class GetFreeChargePage {
appTitle:string;
  appsubTitle:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {


  this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetFreeChargePage');
  }

}
