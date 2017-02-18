import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,AlertController,PopoverController } from 'ionic-angular';
import    * as config   from '../../herafie.config.ts';
import { User, Neigbouhood} from '../../models/user';
import {LoginService} from '../login/login.service';
import {GetLocationPage} from '../get-location/get-location';

import {FormBuilder, FormGroup,Validators,AbstractControl} from '@angular/forms';

import {DonePropOverPage} from '../done-prop-over/done-prop-over';

import {OrderService} from '../../providers/order.server';
import { AppSqlTableService } from '../../providers/app-sql-table-service';



/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

   appTitle:string;
  appsubTitle:string;
  newUsre:User;
   perid:number=1000000;

   neigbouhoods: Neigbouhood[] ;
   nacd:Neigbouhood={
     id:1,name:'ff'
   };

    cityies:string[] =['مكة المكرمة'];
    knowFromWays:string[]=['من صديق'];

   myForm: FormGroup;
   name:AbstractControl;
   mobile:AbstractControl;
   city:AbstractControl;
 neighborhood:AbstractControl;
 email:AbstractControl;
 knownFrom:AbstractControl;
  constructor(public loginservice:LoginService,
    public loadingCtrl: LoadingController,
  public navCtrl: NavController,
   public navParams: NavParams,
   private alertCtrl: AlertController,
   public popoverCtrl: PopoverController,
   fb: FormBuilder,
   orderService:OrderService
   ) {
  
  
  this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;
this.neigbouhoods=[
       { id:0,name: 'المسفلة'},
   { id:1,name: 'الكعكية'},
   { id:2,name: 'الملاوى'},
    { id:3,name:'بطحاء قريش'},
    { id:4,name:'العوالى'},
    { id:5,name:'الاسكان'},
   { id:6,name: 'الشوقية'},
   { id:7,name: 'كدى'},
    { id:8,name:'السبهانى'},
   { id:9,name: 'الحمراء'},
    { id:10,name:'الشهداء'},
    { id:11,name:'العمرة'},
   { id:12, name:'البحيرات'},
    { id:13,name:'النوارية'},
    { id:14,name:'الفيحاء'},
{ id:15,name:'شارع الحج'},
   { id:16, name:'الغسالة'},
   { id:17, name:'وادى جليل'},
   { id:18, name:'الخنساء'},
    { id:19,name:'ريع زاخر'},
   { id:20, name:'جرول'},
    { id:21,name:'العتيبيه'},
    { id:22,name:'ريع الكحل'},
    { id:23,name:'الزاهر'},
    { id:24,name:'ملقيه'},
    { id:25,name:'السفلة'},
    { id:26,name:'الهجرة'},
   { id:27,name: 'الدائرى'},
    { id:28,name:'الإسكان'},
    { id:29,name:'شارع منصور'},
   { id:30,name:'الحفاير'},
    { id:31,name:'الطندباوى'},
    { id:32,name:'الهنداوية'},
    { id:33,name:'البيبان'},
    { id:34,name:'القشلة'},
    { id:35,name:'مخططات الشرائع'},
    { id:36,name:'شرائع المجاهدين'},
    { id:37,name:'جبل النور'}

  ];

this.newUsre=new User();

this.myForm = fb.group({
 'name': ['',Validators.required],
 'mobile':[OrderService.user.mobile,Validators.required],
 'city':[this.cityies[0],Validators.required],
 'neighborhood':[this.neigbouhoods[0].name,Validators.required],
 'email':['',Validators.required],
 'knownFrom':[this.knowFromWays[0],Validators.required]
 });


   this.name=this.myForm.controls['name'];
   this.mobile=this.myForm.controls['mobile'];
   this.city=this.myForm.controls['city'];
 this.neighborhood=this.myForm.controls['neighborhood'];
 this.email=this.myForm.controls['email'];
 this.knownFrom=this.myForm.controls['knownFrom'];


  }

  ionViewDidLoad() {


    console.log('ionViewDidLoad RegisterPage');
  }


  register(user:User){

console.log(user);

 let loader = this.loadingCtrl.create({
      content:"جارى انشاء حساب جديد...انتظر رجاء"
        });
    loader.present();
LoginService.createnewAcount(user).then(response=>{
   if(response.sucess==='true'){

     OrderService.user=user;
     this.craeteUserInTableThenLogeed(user,loader);
     
   }
},err=>{

});

// loader.present();

// setTimeout(function(){
// loader.dismiss();

// },2000);
  }

  doneAlert() {
 
 
   let popover = this.popoverCtrl.create(DonePropOverPage);
    popover.present();
       this.gotoNextScreen();

    setTimeout(()=>{
    popover.dismiss();

    },8000);

  }

 craeteUserInTableThenLogeed(user:User,loader:any){

   AppSqlTableService.insertNewUser(user).then((data) => { 
                  loader.dismiss();
                this.doneAlert();  
                }, (error) => {
                    console.error("Unable to execute sql", error);
                });
    }

    gotoNextScreen(){
    this.navCtrl.push(GetLocationPage);
    }

}
