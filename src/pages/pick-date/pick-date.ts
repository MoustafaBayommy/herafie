import { Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NavController, NavParams, AlertController, Platform, LoadingController, ToastController, PopoverController } from 'ionic-angular';
import { FileChooser } from 'ionic-native';
import { RatingPage } from '../pages';
import { Order } from '../order';
import * as config from '../../herafie.config.ts';
import { OrderService } from '../../providers/order.server';
import { MyOrdersService } from '../../providers/myorders.service';
import { DonePropOverPage } from '../done-prop-over/done-prop-over';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation
import { TranslateService } from 'ng2-translate';
import { Camera } from 'ionic-native';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureAudioOptions, CaptureVideoOptions } from 'ionic-native';


// import { PolymerElement } from '@vaadin/angular2-polymer';

// import { DatePickerModule } from 'ng2-datepicker';

// declare var DatePicker: any;

/*
  Generated class for the PickDate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

// declare var  moment:any;
//for android
declare var fileChooser: any;
//for ios
declare var FilePicker: any;
interface Times {
  id: number,
  title: string
}

@Component({
  selector: 'page-pick-date',
  templateUrl: 'pick-date.html',
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
    ,
  trigger('fade', [
    state('visible', style({
      opacity: 1
    })),
    state('invisible', style({
      opacity: 0.1
    })),
    transition('visible <=> invisible', animate('200ms linear'))
  ]),
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
export class PickDatePage {
  @ViewChild('video') video: any;
  @ViewChild('image') image: any;
  @ViewChild('audio') audio: any;

  appTitle: string;
  appsubTitle: string;
  onTime: Times;
  onDate: Date;
  selectedDate: string;
  describsionText: string;
  describsionFile: File;
  static describsionFilePath: string = "gggg.jpg";

  times: Times[] = [];
  daysOfTheWeek: string[];
  today: string;
  startTime: number;
  endTime: number;
  increments: number;
  monthNames: string[];
  videoColor: string;
  imageColor: string;
  audioColor: string;
  loader: any;
  extention: string;
  isIncludeFile: boolean = false;
  titlestyelClass: string;
  lang: string;
  bounceState: String = "noBounce";
  fadeState: String = "invisible";
  flayState0: string = "out";
  flayState1: string = "out";
  flayState2: string = "out";
  flayState3: string = "out";
  flayState4: string = "out";
  imageDisplay: string = "none";
  audioDisplay: string = "none";
  videoDisplay: string = "none";


  imagUrl: string = "";
  audioUrl: string = "";
  videoUrl: string = "";

  // public base64File: string;



  constructor(public platform: Platform, public orderService: OrderService,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public myordersService: MyOrdersService,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController, public navParams: NavParams,
    public translate: TranslateService
  ) {



    this.lang = OrderService.lang;
    this.titlestyelClass = "pick_" + OrderService.lang;
    console.log(OrderService.order);
    this.appTitle = config.data.appTitle;
    this.appsubTitle = config.data.appSubTitle;;
    //setting Date Picker
    this.onDate = new Date();

    console.log(this.onDate.getDay());

    if (this.onDate.getDay() == 5) {
      // alert('fdfgdf');
      this.onDate = new Date(this.onDate.getTime() - 1000 * 60 * 60 * 24);
    }

    this.onDate = new Date(this.onDate.getUTCFullYear(), this.onDate.getUTCMonth(), this.onDate.getUTCDate());

    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.selectedDate = localISOTime;
    console.log(this.selectedDate);

    console.log(this.navParams);
    if (this.lang == "ar") {
      this.monthNames = ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
      this.daysOfTheWeek = ['الأحد', 'الأثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    } else {
      this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      this.daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }

    //setting avaliable Days
    this.startTime = 9;
    this.endTime = 21;
    this.increments = 2;
    for (var i = 0; i < (this.endTime - this.startTime) / this.increments; i++) {
      var startTimetemp: number = this.startTime + (i * 2);
      var startString: string = this.lang == "ar" ? 'ص' : 'AM';
      var endTimetemp: number = this.startTime + ((i + 1) * 2);
      var endString: string = this.lang == "ar" ? 'ص' : 'AM';;



      if (startTimetemp > 12) {
        startTimetemp = startTimetemp - 12;
        startString = this.lang == "ar" ? 'م' : 'PM';
      }
      if (endTimetemp > 12) {
        endTimetemp = endTimetemp - 12;
        endString = this.lang == "ar" ? 'م' : 'PM';

      }

      var titltes: string = this.lang == "ar" ? endTimetemp + ' من ' + startTimetemp + startString + ' الى' : ' From ' + startTimetemp + startString + ' To ' + endTimetemp;

      this.times.push({ id: i, title: titltes });


      translate.get('pickDate.loading').subscribe(
        value => {
          this.loader = this.loadingCtrl.create({
            content: value
          });
        }
      );


    }


    this.videoColor = '#7f7f7f';
    this.audioColor = '#7f7f7f';
    this.imageColor = '#7f7f7f';

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
              this.fadeState = 'visible';

            }, 150);
          }, 150);
        }, 150);
      }, 150);
    }, 150);
    console.log('ionViewDidLoad PickDatePage');
  }
  dateChange(event: any) {

    var date: Date = new Date(event.year.value, event.month.value - 1, event.day.value);
    date = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);


    //  event.year.value=2020;

    if (this.isDateGratherThanToday(date)) {
      if (date.getDay() === 5) {
        this.onDate = new Date(event.year.value, event.month.value - 1, event.day.value - 1);

        this.showAlert(1);
        //  this.onDate= new Date();
        //  this.selectedDate=this.onDate.toISOString();

      } else {
        this.onDate = date;
      }
    } else {
      this.onDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      this.onDate = new Date(this.onDate.valueOf() - this.onDate.getTimezoneOffset() * 60000);


      //  this.onDate= new Date();
      this.showAlert(0);
    }

    this.selectedDate = this.onDate.toISOString();

  }
  timeChange(id: number) {
    this.onTime = this.getTimeStringById(id);

  }
  showAlert(code: number) {
    if (code == 0) {
      this.translate.get('pickDate.invalied').subscribe(
        value => {
          this.presentToast(value);
        }
      )
    } else {
      this.translate.get('pickDate.dateerror').subscribe(
        value => {
          this.presentToast(value);
        }
      )
    }

  }

  showDoneToast() {
    this.translate.get('pickDate.sent').subscribe(
      value => {

        this.presentToast(value);
      }
    )
  }


  isDateGratherThanToday(date: Date): boolean {
    let today: Date = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());

    if (date.getUTCFullYear() > today.getUTCFullYear()) {
      return true;
    } else if (date.getUTCFullYear() == today.getUTCFullYear()) {
      if (date.getUTCMonth() > today.getUTCMonth()) {
        return true;
      } else if (date.getUTCMonth() == today.getUTCMonth()) {
        if (date.getUTCDate() >= today.getUTCDate()) {
          return true;
        }
      }
    }
    return false;
  }



  getTimeStringById(id: number): Times {
    for (let time of this.times) {
      if (time.id == id) {
        return time;
      }
    }
    return null;

  }


  oredrNow() {
            this.loader.present();

    let timeError: boolean = (typeof this.onTime == 'undefined' || this.onTime == null);
    let descError: boolean = (typeof this.describsionText == 'undefined' || this.describsionText == null || this.describsionText.length == 0);

    if (timeError || descError) {
      if (timeError && descError) {
        this.translate.get('pickDate.both').subscribe(
          value => {
            this.loader.dismiss();
            this.presentToast(value);
          }
        )
      } else if (timeError) {
        this.translate.get('pickDate.timeMissed').subscribe(
          value => {
            this.loader.dismiss();
            this.presentToast(value);
          }
        )
      } else {
        this.translate.get('pickDate.descMissed').subscribe(
          value => {
            this.loader.dismiss();
            this.presentToast(value);
          }
        )
      }


    } else {

      let datePipe = new DatePipe('GMT');
      let ondateSql = datePipe.transform(this.onDate, 'yyyy-MM-dd 00:00:00');
      console.log(ondateSql + " ondateSql");
      OrderService.order.onDate = new Date(ondateSql);
      OrderService.order.onTime = this.onTime.title;
      OrderService.order.descriptionText = this.describsionText;
      // OrderService.order.descriptionFile=this.describsionFile.name;
      OrderService.order.clientMobil = OrderService.user.mobile;

      //check in All Variables
      console.log(OrderService.order);
      this.loader.present();

      this.isIncludeFile = true;
      if (this.imagUrl.length > 1) {
        PickDatePage.describsionFilePath = this.imagUrl;
      } else if (this.videoUrl.length > 1) {
        PickDatePage.describsionFilePath = this.videoUrl;
      } else if (this.audioUrl.length > 1) {
        PickDatePage.describsionFilePath = this.audioUrl;
      } else {
        this.isIncludeFile = false;
      }
      console.log('videoUrl '+this.videoUrl);
      console.log('audioUrl '+this.audioUrl);
      console.log('imagUrl '+this.imagUrl);
      console.log('isIncludeFile '+this.isIncludeFile);



      if (this.isIncludeFile) {
        this.myordersService.uploadFile(PickDatePage.describsionFilePath)
          .then((data) => {
            console.log(data + ' returned');

            var response = JSON.parse(data.response);
            console.log(JSON.stringify(response) + ' response');
            if (response.filesucess === 'true') {

              OrderService.order.descriptionFile = response.name;
              this.sendOrder();
            } else {
              this.translate.get('pickDate.fileError').subscribe(
                value => {

                  this.presentToast(value);
                }
              );
            }


          }, (err) => {

            console.log(JSON.stringify(err) + ' file error');
            this.translate.get('pickDate.fileError').subscribe(
              value => {
                this.loader.dismiss();
                this.presentToast(value);
              }
            )
          });
      } else {
        this.sendOrder();

      }
    }
    // this.navCtrl.push(RatingPage)
  }

  selectVideo() {

    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 120
    };
    MediaCapture.captureVideo(options)
      .then(
      (data: MediaFile[]) => {
        this.imageDisplay = 'none';
        this.audioDisplay = 'none';
        this.videoDisplay = 'block';
        this.imagUrl = '';
        this.audioUrl = '';
        this.videoUrl = '';
        this.videoUrl = data[0].fullPath
      },
      (err: CaptureError) => console.error(err)
      );
    // this.openFileBrowser();

    this.videoColor = '#ffa500';
    this.audioColor = '#7f7f7f';
    this.imageColor = '#7f7f7f';
  }

  selectImage() {
    let options: CaptureImageOptions = { limit: 1 };
    MediaCapture.captureImage(options)
      .then(
      (data: MediaFile[]) => {

        this.imageDisplay = 'block';
        this.audioDisplay = 'none';
        this.videoDisplay = 'none';
        this.imagUrl = '';
        this.audioUrl = '';
        this.videoUrl = '';
        this.imagUrl = data[0].fullPath;
      },
      (err: CaptureError) => console.error(err)
      );
    // this.openFileBrowser();
    this.videoColor = '#7f7f7f';
    this.audioColor = '#7f7f7f';
    this.imageColor = '#ffa500';
    // Camera.getPicture({destinationType: Camera.DestinationType.DATA_URL,
    //         targetWidth: 1000,
    //         targetHeight: 1000}).then((imageData) => {
    //  // imageData is either a base64 encoded string or a file URI
    //  // If it's base64:
    //  let base64Image = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //  // Handle error
    // });
  }

  selectAudio() {

    let options: CaptureAudioOptions = {
      limit: 1,
      duration: 120
    };
    MediaCapture.captureAudio(options)
      .then(
      (data: MediaFile[]) => {
        this.imageDisplay = 'none';
        this.audioDisplay = 'block';
        this.videoDisplay = 'none';
        this.imagUrl = '';
        this.audioUrl = '';
        this.videoUrl = '';
        this.audioUrl = data[0].fullPath;
      },
      (err: CaptureError) => console.error(err)
      );
    //  this.openFileBrowser();
    this.videoColor = '#7f7f7f';
    this.audioColor = '#ffa500';
    this.imageColor = '#7f7f7f';
  }


  get describsionFilePath() {
    return PickDatePage.describsionFilePath;
  }

  openFileBrowser() {

    console.log('fileBrows');
    if (this.platform.is('ios')) {
      console.log('fileBrowsIos' + FilePicker);
      FilePicker.pickFile(function (data) {
        PickDatePage.describsionFilePath = data;
        this.extention = data.split('.')[1];

        this.isIncludeFile = true;
      }, function (error) { }
        , "public.data");

    } else if (this.platform.is('android')) {

      FileChooser.open()
        .then(uri => {
          PickDatePage.describsionFilePath = uri;
          this.extention = uri.split('.')[1];
          console.log(uri);

          this.isIncludeFile = true;
        })
        .catch(e => console.log(e));
      // something else
      //               fileChooser.open(function(uri) {
      // });
    }



  }
  doneAlert() {


    let popover = this.popoverCtrl.create(DonePropOverPage);
    popover.present();
    //  this.gotoNextScreen();

    setTimeout(() => {
      popover.dismiss();
      this.showDoneToast();

    }, 2000);

  }

  sendOrder() {
    this.myordersService.sendMyOrder(OrderService.order).then(response => {
      if (response.sucess === 'true') {
        this.loader.dismiss();
        this.doneAlert();
        //  this.showDoneToast();
        this.navCtrl.setRoot(RatingPage);
      } else {
        this.translate.get('myOrders.alert.networkError').subscribe(
          value => {
            this.loader.dismiss();
            this.presentToast(value);

          }
        );
      }

    }).catch((ex) => {
      this.translate.get('myOrders.alert.networkError').subscribe(
        value => {
          this.loader.dismiss();
          this.presentToast(value);

        }
      )
    });
  }


  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}

