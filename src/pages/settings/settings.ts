import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import * as config from '../../herafie.config.ts';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation
import { OrderService } from '../../providers/order.server';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User, Neigbouhood } from '../../models/user';
import { DonePropOverPage } from '../done-prop-over/done-prop-over';
import { TranslateService } from 'ng2-translate';
import { LoginService } from "../login/login.service";
import { AppSqlTableService } from "../../providers/app-sql-table-service";
import { WelcomePage } from '../pages'


/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
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
    ]),

  ])
    , trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0.1
      })),
      transition('visible <=> invisible', animate('200ms linear'))
    ]),

  ]
})
export class SettingsPage {
  appTitle: string;
  appsubTitle: string;
  public titlestyelClass;
  bounceState: String = "noBounce";
  fadState: String = "invisible";

  myForm: FormGroup;
  name: AbstractControl;
  neighborhood: AbstractControl;
  email: AbstractControl;
  notifiy: boolean;
  neigbouhoods: Neigbouhood[];
  loader: any;

  constructor(public loginservice: LoginService,
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    fb: FormBuilder, public translate: TranslateService,
    orderService: OrderService, public navParams: NavParams) {
this.notifiy=OrderService.user.notifiy;


    translate.get('setting.getting').subscribe(
      value => {
        this.loader = this.loadingCtrl.create({
          content: value
        });
        this.loader.present();
      }
    );



    this.neigbouhoods = OrderService.neigbouhoods;
    this.myForm = fb.group({
      'name': [OrderService.user.name, Validators.required],
      // 'notifiy': [OrderService.user.notifiy, Validators.required],

      //  'mobile':[OrderService.user.mobile,Validators.required],
      'neighborhood': [OrderService.user.neighborhood, Validators.required],
      'email': [OrderService.user.email, Validators.required],
    });


    this.name = this.myForm.controls['name'];
    this.neighborhood = this.myForm.controls['neighborhood'];
    this.email = this.myForm.controls['email'];
    // this.notifiy = this.myForm.controls['notifiy'];

    this.appTitle = config.data.appTitle;
    this.appsubTitle = config.data.appSubTitle;
    this.titlestyelClass = "setting_" + OrderService.lang;

  }

  ionViewDidLoad() {

    this.bounceState = 'bouncing';
    setTimeout(() => {
      this.fadState = 'visible';
    }, 200);
    console.log('ionViewDidLoad AboutAppPage');
    this.loader.dismiss();
  }

  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }

  doneAlert() {


    let popover = this.popoverCtrl.create(DonePropOverPage);
    popover.present();
    this.translate.get('setting.done').subscribe(
      value => {
        this.loader.dismiss();
        this.presentToast(value);
      });
    this.gotoNextScreen();

    setTimeout(() => {
      popover.dismiss();

    }, 1000);

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
      message: message,
      duration: 3000
    });
    toast.present();
  }

  update(user: User) {

    this.translate.get('setting.loading').subscribe(
      value => {
        this.loader = this.loadingCtrl.create({
          content: value
        });
        this.loader.present();

     user.mobile=OrderService.user.mobile;
     user.notifiy=this.notifiy;

        LoginService.updateUserData(user).then(response => {
          if (response.sucess === 'true') {
            OrderService.user = user;
            this.updateUserInsQLITE(user, this.loader);

          }
        }).catch(ex => {

          this.translate.get('rate.alert').subscribe(
            value => {
              this.loader.dismiss();
              this.presentToast(value.error);
            });
        });
      }
    );


  }

  updateUserInsQLITE(user: User, loader: any) {

    AppSqlTableService.updateUser(user).then((data) => {
      loader.dismiss();
      this.doneAlert();
    }, (error) => {
      console.error("Unable to execute sql", error);
    });
  }

  gotoNextScreen() {
    this.navCtrl.setRoot(WelcomePage);
  }


}

