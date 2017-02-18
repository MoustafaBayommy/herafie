import { Component } from '@angular/core';
import { DatePipe  } from '@angular/common';

import { NavController, NavParams,AlertController,Platform ,LoadingController,ToastController,PopoverController} from 'ionic-angular';
import { FileChooser } from 'ionic-native';
import {RatingPage} from '../pages';
import {Order} from '../order';
import    * as config   from '../../herafie.config.ts';
import {OrderService} from '../../providers/order.server';
import {MyOrdersService} from '../../providers/myorders.service';
import {DonePropOverPage} from '../done-prop-over/done-prop-over';


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
 declare var fileChooser:any;
 //for ios
declare var FilePicker:any;
interface Times {
  id: number,
  title: string
}

@Component({
  selector: 'page-pick-date',
  templateUrl: 'pick-date.html'
})
export class PickDatePage {
   
 appTitle:string;
  appsubTitle:string;
    onTime:Times;
  onDate:Date;
  selectedDate:string;
  describsionText:string;
  describsionFile:File;
  static describsionFilePath:string="gggg.jpg";

  times: Times[] = [];
  daysOfTheWeek: string[];
  today: string;
  startTime: number;
  endTime: number;
  increments: number;
  monthNames: string[];
videoColor:string;
imageColor:string;
audioColor:string;
loader:any;

  constructor(public platform: Platform,public orderService:OrderService,
  public loadingCtrl: LoadingController,
  private toastCtrl: ToastController,
  public myordersService:MyOrdersService,
  public alertCtrl: AlertController,
   public popoverCtrl: PopoverController,
  public navCtrl: NavController, public navParams: NavParams) {
 
 console.log(OrderService.order);
 this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;;
    //setting Date Picker
    this.onDate=new Date();
    if(this.onDate.getDay()==5){
this.onDate=new Date(this.onDate.getTime()-1000*60*60*24);
    }

   this.selectedDate = this.onDate.toISOString();

    console.log(this.navParams);
    this.monthNames = ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    this.daysOfTheWeek = ['الأحد', 'الأثنين', 'الثلاثاء', 'الأريعاء', 'الخميس', 'الجمعة', 'السبت'];


    //setting avaliable Days
    this.startTime = 9;
    this.endTime = 21;
    this.increments = 2;
    for (var i = 0; i < (this.endTime - this.startTime) / this.increments; i++) {
      var startTimetemp: number = this.startTime + (i * 2);
      var startString: string = 'ص';
      var endTimetemp: number = this.startTime + ((i + 1) * 2);
      var endString: string = 'ص';



      if (startTimetemp > 12) {
        startTimetemp = startTimetemp - 12;
        startString = 'م';
      }
      if (endTimetemp > 12) {
        endTimetemp = endTimetemp - 12;
        endString = 'م';

      }

      var titltes: string = endTimetemp + ' من ' + startTimetemp + startString + ' الى';
   
      this.times.push({ id: i, title: titltes });
   
    }


  this.videoColor='#7f7f7f';
  this.audioColor='#7f7f7f';
  this.imageColor='#7f7f7f';

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PickDatePage');
  }
  dateChange(event: any) {

    var date:Date=new Date(event.year.value,event.month.value-1,event.day.value,0,0,0,0);
   
   event.year.value=2020;
   if(date.getDay()==5){
    //  this.onDate= new Date();
     this.selectedDate=this.onDate.toISOString();
this.showAlert();
        
   }else{
      this.onDate=date;
   }
       console.log(this.selectedDate);

    console.log(this.onDate);
  
}
  timeChange(id:number){
        this.onTime=this.getTimeStringById(id);

  }
   showAlert() {
    let alert = this.alertCtrl.create({
      title: 'اختيار غير مناسب',
      subTitle: '(يوافق يوم جمعة (عطلة رسمية',
      buttons: ['عُلم']
    });
    alert.present();
  }

  showDoneToast(){
     let toast = this.toastCtrl.create({
    message: 'تم إرسال طلبكم بنجاح مندوبنا فى الطريق إليكم',
    duration: 3000,
    position: 'middle'
  });
  }

     showErrorAlert(message:string) {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle:message,
      buttons: ['عُلم']
    });
    alert.present();
  }
  

       showUnCompleteAlert() {
      let alert = this.alertCtrl.create({
      title: 'بيانات غير مكتمله',
      subTitle: 'بجب تحديد وقت مناسب وكتابة توصيف',
      buttons: ['عُلم']
    });
    alert.present();
  }
  

  getTimeStringById(id:number):Times{
    for(let time of this.times){
     if(time.id==id){
       return time;
     }
    }
    return null;
  
  }


oredrNow(){


  if((typeof this.onTime=='undefined'||this.onTime==null)||
  (typeof this.describsionText=='undefined'||this.describsionText==null)
  ){

this.showUnCompleteAlert();
  }else{

    let datePipe = new DatePipe('GMT');
    let ondateSql = datePipe.transform(this.onDate, 'yyyy-MM-dd 00:00:00');
    console.log(ondateSql+" ondateSql");
    OrderService.order.onDate=new Date(ondateSql);
OrderService.order.onTime=this.onTime.title;
OrderService.order.descriptionText=this.describsionText;
// OrderService.order.descriptionFile=this.describsionFile.name;
OrderService.order.clientMobil=OrderService.user.mobile;
PickDatePage.describsionFilePath;
  //check in All Variables
console.log(OrderService.order);
     this.loader = this.loadingCtrl.create({
      content: "جارى أرسال طلبكم...انتظر رجاء"
    });
this.loader.present();

this.myordersService.uploadFile(PickDatePage.describsionFilePath)
  .then((data) => {
console.log(data+' returned')
  if(data.filesucess==='true'){
    
  OrderService.order.descriptionFile=  data.name;
this.myordersService.sendMyOrder(OrderService.order).then(response=>{
  if(response.sucess==='true'){
  this.loader.dismiss();
   this.doneAlert();
  //  this.showDoneToast();
   this.navCtrl.setRoot(RatingPage);
  }else{
     this.loader.dismiss();
this.showErrorAlert('حدث خطأ اثناء ارسال طلبك  تاكد من اتصال الشبكة ثم حاول مجددا');  ;
  }
 
}).catch((ex) => {
     this.loader.dismiss();
this.showErrorAlert('تاكد من اتصال الشبكة ثم حاول مجددا'); 
 });
  }else{
    this.showErrorAlert('خطأ اثناء ارسال الملف تاكد من اتصال الشبكة ثم حاول مجددا');    

  }


   }, (err) => {
     this.loader.dismiss();
this.showErrorAlert('خطأ اثناء ارسال الملف تاكد من اتصال الشبكة ثم حاول مجددا');    });

  }
  // this.navCtrl.push(RatingPage)
}

selectVideo(){
this.openFileBrowser();

this.videoColor='#ffa500';
this.audioColor='#7f7f7f';
this.imageColor='#7f7f7f';
}

selectImage(){
  this.openFileBrowser();
this.videoColor='#7f7f7f';
this.audioColor='#7f7f7f';
this.imageColor='#ffa500';
}

selectAudio(){
 this.openFileBrowser();
this.videoColor='#7f7f7f';
this.audioColor='#ffa500';
this.imageColor='#7f7f7f';
}


get   describsionFilePath(){
  return   PickDatePage.describsionFilePath;
}

openFileBrowser(){

  console.log('fileBrows');
    if (this.platform.is('ios') ) {
console.log('fileBrowsIos'+FilePicker);
      FilePicker.pickFile(function(data){
        PickDatePage.describsionFilePath=data;
      },function(error){}
      ,"public.data");

            } else if( this.platform.is('android')) {
                // something else
                  fileChooser.open(function(uri) {
           PickDatePage.describsionFilePath=uri;
    });
            }



}
  doneAlert() {
 
 
   let popover = this.popoverCtrl.create(DonePropOverPage);
    popover.present();
      //  this.gotoNextScreen();

    setTimeout(()=>{
    popover.dismiss();

    },2000);

  }



}

