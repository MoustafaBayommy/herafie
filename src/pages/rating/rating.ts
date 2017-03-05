import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, LoadingController, PopoverController } from 'ionic-angular';
import { Rate } from '../../models/rate';
import { User } from '../../models/user';

import { MyOrdersService } from '../../providers/myorders.service';
import { OrderService } from '../../providers/order.server';

import { DonePropOverPage } from '../done-prop-over/done-prop-over';
import { WelcomePage } from '../pages';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation
import { TranslateService } from 'ng2-translate';

/*
  Generated class for the Rating page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
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
    ])
  ])
    ,
  trigger('flyInOut', [
    state('in', style({
      transform: 'translate3d(0, 0, 0)'
    })),
    state('out', style({
      transform: 'translate3d(150%, 0, 0)'
    })),
    transition('in => out', animate('100ms ease-in')),
    transition('out => in', animate('100ms ease-out'))
  ])
  ]

})
export class RatingPage {
  appTitle: string;
  appsubTitle: string;

  rate: Rate;
  appRate: number;
  delegateRate: number;
  techRate: number;
  notes: string;
  loader: any;
  starsStyle: string;
  bounceState: String = "noBounce";
  flayState0: string = "out";
  flayState1: string = "out";
  flayState2: string = "out";



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public ratingservice: MyOrdersService,
    public translate: TranslateService,
  ) {

    this.starsStyle = "rate_" + OrderService.lang;

    this.rate = new Rate();
    this.rate.appRate = 1;
    this.rate.agentRate = 1;
    this.rate.techRate = 1;

    // OrderService.user = new User();
    // OrderService.user.mobile = '01000';
  }

  ionViewDidLoad() {
    this.bounceState = 'bouncing';
    setTimeout(() => {
      this.flayState0 = 'in';
      setTimeout(() => {
        this.flayState1 = 'in';
        setTimeout(() => {
          this.flayState2 = 'in';

        }, 150);
      }, 150);
    }, 150);
    console.log('ionViewDidLoad RatingPage');
  }

  sendRate() {
    this.translate.get('rate.loading').subscribe(
      value => {
        this.loader = this.loadingCtrl.create({
          content: value
        });
        this.loader.present();
        this.rate.client = OrderService.user.mobile;
        this.ratingservice.sendRating(this.rate).then(response => {
          if (response.sucess === 'true') {
            this.loader.dismiss();
            this.doneAlert();
            this.navCtrl.setRoot(WelcomePage);
            //  this.showDoneToast();
          } else {
            this.translate.get('rate.alert').subscribe(
              value => {
                this.loader.dismiss();
                this.showErrorAlert(value.error,value.alertButton);
              });

          }
        }).catch(ex => {
          this.translate.get('rate.alert').subscribe(
            value => {
              this.loader.dismiss();
                this.showErrorAlert(value.error,value.alertButton);
            });

        });

      });

  }


  showErrorAlert(message: string,button:string) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: [button]
    });
    alert.present();
  }

  doneAlert() {


    let popover = this.popoverCtrl.create(DonePropOverPage);
    popover.present();
    //  this.gotoNextScreen();

    setTimeout(() => {
      popover.dismiss();

    }, 2000);

  }
}
