import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, PopoverController, ToastController } from 'ionic-angular';
import * as config from '../../herafie.config.ts';
import { User, Neigbouhood, City, ways } from '../../models/user';
import { LoginService } from '../login/login.service';
import { GetLocationPage } from '../get-location/get-location';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { DonePropOverPage } from '../done-prop-over/done-prop-over';

import { OrderService } from '../../providers/order.server';
import { AppSqlTableService } from '../../providers/app-sql-table-service';

import { TranslateService } from 'ng2-translate';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation


/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
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
export class RegisterPage {

  appTitle: string;
  appsubTitle: string;
  newUsre: User;
  perid: number = 1000000;

  neigbouhoods: Neigbouhood[];
  nacd: Neigbouhood = {
    id: 1, name: 'ff', title: ''
  };

  cityies: City[] = [{ id: 0, name: 'مكة المكرمة', title: "register.cities.mecca" }];
  knowFromWays: ways[] = [{ id: 0, name: 'من صديق', title: "register.howmethods.friend" }];


  myForm: FormGroup;
  name: AbstractControl;
  mobile: AbstractControl;
  city: AbstractControl;
  neighborhood: AbstractControl;
  email: AbstractControl;
  knownFrom: AbstractControl;
  titlestyelClass: string;
  loader: any;
  bounceState: String = "noBounce";
  flayState0: string = "out";
  flayState1: string = "out";
  flayState2: string = "out";
  flayState3: string = "out";
  flayState4: string = "out";

  constructor(public loginservice: LoginService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
      private toastCtrl: ToastController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    fb: FormBuilder,
    orderService: OrderService,
    public translate: TranslateService
  ) {




    translate.get('register.loading').subscribe(
      value => {
        this.loader = this.loadingCtrl.create({
          content: value
        });
      }
    )

    this.titlestyelClass = "reg_" + OrderService.lang;

    this.appTitle = config.data.appTitle;
    this.appsubTitle = config.data.appSubTitle;
    this.neigbouhoods =OrderService.neigbouhoods;

    this.newUsre = new User();

    this.myForm = fb.group({
      'name': ['', Validators.required],
      //  'mobile':[OrderService.user.mobile,Validators.required],
      'mobile': ['18800', Validators.required],

      'city': [this.cityies[0].name, Validators.required],
      'neighborhood': [this.neigbouhoods[0].name, Validators.required],
      'email': ['', Validators.required],
      'knownFrom': [this.knowFromWays[0].name, Validators.required]
    });


    this.name = this.myForm.controls['name'];
    this.mobile = this.myForm.controls['mobile'];
    this.city = this.myForm.controls['city'];
    this.neighborhood = this.myForm.controls['neighborhood'];
    this.email = this.myForm.controls['email'];
    this.knownFrom = this.myForm.controls['knownFrom'];


  }

  ionViewDidLoad() {
    this.bounceState = 'bouncing';
    setTimeout(() => {
      this.flayState0 = 'in';
      setTimeout(() => {
        this.flayState1 = 'in';
        setTimeout(() => {
          this.flayState2 = 'in';
          setTimeout(() => {
            this.flayState3 = 'in';
            setTimeout(() => {
              this.flayState4 = 'in';

            }, 150);
          }, 150);
        }, 150);
      }, 150);
    }, 150);

    console.log('ionViewDidLoad RegisterPage');
  }


  register(user: User) {

    console.log(user);


    this.loader.present();
    LoginService.createnewAcount(user).then(response => {
      if (response.sucess === 'true') {

        OrderService.user = user;
        
        this.craeteUserInTableThenLogeed(user, this.loader);

      }
    }).catch(ex => {
      this.translate.get('rate.alert').subscribe(
        value => {
          this.loader.dismiss();
          this.presentToast(value.error);
        });
    });


    // loader.present();

    // setTimeout(function(){
    // loader.dismiss();

    // },2000);
  }

  doneAlert() {


    let popover = this.popoverCtrl.create(DonePropOverPage);
    popover.present();
       this.translate.get('register.done').subscribe(
        value => {
          this.loader.dismiss();
          this.presentToast(value);
        });
    this.gotoNextScreen();

    setTimeout(() => {
      popover.dismiss();

    }, 1000);

  }

  craeteUserInTableThenLogeed(user: User, loader: any) {

    AppSqlTableService.insertNewUser(user).then((data) => {
      loader.dismiss();
      this.doneAlert();
    }, (error) => {
      console.error("Unable to execute sql", error);
    });
  }

  gotoNextScreen() {
    this.navCtrl.push(GetLocationPage);
  }

  showErrorAlert(message: string, button: string) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: [button]
    });
    alert.present();
  }

 presentToast(message) {
    let toast = this.toastCtrl.create({
      message:message,
      duration: 3000
    });
    toast.present();
  }

}
