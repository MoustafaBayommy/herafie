import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ServicesPage} from '../pages';
import {Order} from '../../models/order';
import {User} from '../../models/user';

import    * as config   from '../../herafie.config.ts';

import {OrderService} from '../../providers/order.server';




interface Col {

  id: number,
  name: string,
  iconName: string,
  isSelected:boolean
}


/*
  Generated class for the Main page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
 export class MainPage {
 appTitle:string;
  appsubTitle:string;
  selectedPlace: Col=  {
        id: 2,
        name: 'محلات تجارية',
        iconName: 'shopping-basket',
  isSelected:false

      };
  rows:[Col[]];


  constructor(public orderService:OrderService,public navCtrl: NavController, public navParams: NavParams) {

    if(typeof OrderService.order == 'undefined'&&OrderService.order==null){
       OrderService.order=new Order();
      // OrderService.order.clientMobil='01000';
    }
 this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;
 this.rows=[[
    {
        id: 2,
        name: 'محلات تجارية',
        iconName: 'shopnew',
  isSelected:true

      }
,
{
          id: 6,
          name: 'مطاعم',
          iconName: 'dinnernew',
  isSelected:false
        }
     ]
      ,[{
        id: 0,
        name: 'شقة',
        iconName:'buildingnew',
  isSelected:false
      } 
 ,
     {
        id: 1,
        name: 'فيلا',
        iconName: 'villa-1new',
  isSelected:false
      }
      ],[
      {
        id: 3,
        name: 'مبنى سكنى',
        iconName: 'd-buildingnew',
  isSelected:false
      }
       , 
   {
          id: 5,
          name: 'فندق',
          iconName: 'bednew',
  isSelected:false
        }
     ]
        
        ];


   


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    console.log('clientAdress ' + this.navParams.get('clientAdress'));
  }


  placeSelected(place:Col) {
    for(let row of this.rows){
          for(let col of row){
                col.isSelected=false;
                if(col.id==place.id){
                col.isSelected=true;
                }
            }
            }
    

    this.selectedPlace=place;
    console.log(place);
        console.log(this.rows);

  }

  next(){
        // console.log(this.selectedPlace);

    OrderService.order.placetype=this.selectedPlace.name
    // this.navCtrl.push(ServicesPage,{'placetype':this.selectedPlace.name});
        this.navCtrl.push(ServicesPage);

  }

}
