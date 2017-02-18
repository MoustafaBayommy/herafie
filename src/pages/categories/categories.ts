import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PickDatePage}from '../pages.ts';
import    * as config   from '../../herafie.config.ts';
import {OrderService} from '../../providers/order.server';


interface Col {

  id: number,
  name: string,
  iconName: string,
    className:string,
    grupName:string
}
/*
  Generated class for the Categories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
   appTitle:string;
  appsubTitle:string;
  mainService:string;
 selectedCat: Col={
    id:1222222,
    name:'non',
    iconName:'',
        className:'itemActive',
        grupName:''
  };
  rows:[Col[]];

  maintainRows:[Col[]]=[[
{       
        id: 0,
        name: 'سباكة',
        iconName: 'icon-tap',
        className:'itemActive',
        grupName:'قسم الصيانة'
  }],
    [  {
        id: 1,
        name: 'كهربا',
        iconName: 'fa-plug',
        className:'nonActive',
        grupName:'قسم الصيانة'
  }]
      ,[
        {
        id: 3,
        name: 'تكييف',
        iconName: 'icon-air-conditionernew',
        className:'nonActive',
        grupName:'قسم الصيانة'
      
      }],[{
      
        id: 2,  
        name: 'أخرى',
        iconName: 'icon-magic-wandnew',
        className:'nonActive',
        grupName:''
      } 
      ]
      ];
    cleanRows:[Col[]]=[[
{       
        id: 0,
        name: 'نظافة عامة',
        iconName: 'icon-wiping-swipe-for-floors',
        className:'itemActive',
        grupName:'قسم النظافة'
  }],
    [  {
        id: 1,
        name: 'تلمیع الارضیات',
        iconName: 'icon-clean-floor',
        className:'nonActive',
        grupName:'قسم النظافة'
  }]
      ,[
        {
        id: 3,
        name: 'خدمة مكافحة حشرات',
        iconName: 'icon-roachnew  ',
        className:'nonActive',
        grupName:'قسم النظافة'
      
      }],[
        {
        id: 3,
        name: 'تقعیم خزانات',
        iconName: 'icon-tank-1new',
        className:'nonActive',
        grupName:'قسم النظافة'
      
      }],
      [
        {
        id: 3,
        name: 'تنظیف اثاث',
        iconName: 'icon-vacuum-cleanernew',
        className:'nonActive',
        grupName:'قسم النظافة'
      
      }],
      [{
      
        id: 2,  
        name: 'أخرى',
        iconName: 'icon-magic-wandnew',
        className:'nonActive',
        grupName:'النظافة'
      } 
      ]
      ];
  fixRows:[Col[]]=[[
{       
        id: 0,
        name: 'تركیب ارضیات',
        iconName: 'icon-tilesnew',
        className:'itemActive',
        grupName:'قسم الترميم والتشطيب'
  }],
    [  {
        id: 1,
        name: 'دھانات',
        iconName: 'icon-art-painting-rollernew',
        className:'nonActive',
        grupName:'قسم الترميم والتشطيب'
  }]
      ,[
        {
        id: 3,
        name: 'اسقف ودیكور',
        iconName: 'icon-roofnew',
        className:'nonActive',
        grupName:'قسم النظافة'
      
      }],
      [{
      
        id: 2,  
        name: 'أخرى',
        iconName: 'icon-magic-wandnew',
        className:'nonActive',
        grupName:'قسم الترميم والتشطيب'
      } 
      ]
      ];
  elecronicRows:[Col[]]=[[
{       
        id: 0,
        name: 'أنظمة مراقبة كامیرات',
        iconName: 'icon-casino-cctvnew',
        className:'itemActive',
        grupName:'قسم الإلكترونيات'
  }],
    [  {
        id: 1,
        name: 'شبكات و سنترالات',
        iconName: 'icon-computers-network-interface-symbolnew',
        className:'nonActive',
        grupName:'قسم الإلكترونيات'
  }]
      ,[
        {
        id: 3,
        name: 'أنظمة صوت',
        iconName: 'icon-speaker-systemnew',
        className:'nonActive',
        grupName:'قسم الإلكترونيات'
      
      }],
      [
        {
        id: 3,
        name: 'الحاسب وتوابعة',
        iconName: 'fa-laptop',
        className:'nonActive',
        grupName:'قسم الإلكترونيات'
      
      }],
      [{
      
        id: 2,  
        name: 'أخرى',
        iconName: 'icon-magic-wandnew',
        className:'nonActive',
        grupName:'قسم الإلكترونيات'
      } 
      ]
      ];

  constructor(public orderService:OrderService,public navCtrl: NavController, public navParams: NavParams) {

 this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;

    this.mainService=OrderService.order.mainServceType;


switch(this.mainService){
case 'قسم الصيانة':
 this.rows=this.maintainRows;
 break;
 case 'قسم النظافة':
 this.rows=this.cleanRows;
 break;
 case 'قسم الترميم والتشطيب':
 this.rows=this.fixRows;
 break; 
 case 'قسم الإلكترونيات':
 this.rows=this.elecronicRows;
 break;
 default:
 break;
}
   this.selectedCat=this.rows[0][0];


//  this.rows=[[
// {       
//         id: 0,
//         name: 'سباكة',
//         iconName: 'icon-tap',
//         className:'itemActive',
//         grupName:'قسم صيانة'
//       },
//       {
//         id: 1,
//         name: 'كهربا',
//         iconName: 'icon-light-bulb-2',
//         className:'nonActive',
//         grupName:'قسم صيانة'
//       }
//       ]
//       ,[
//         {
//         id: 3,
//         name: 'تكييف',
//         iconName: 'icon-air-conditioner-1',
//         className:'nonActive',
//         grupName:'قسم صيانة'
      
//     },{
      
//         id: 2,  
//         name: 'أخرى',
//         iconName: 'icon-carpenter',
//         className:'nonActive',
//         grupName:''
//       }
        
//       ],
//       [{
//           id: 5,
//           name: 'أنظمة إلكترونية',
//           iconName: 'icon-television-1',
//         className:'nonActive',
//         grupName:''
//       },

//         {
//           id: 6,
//           name: 'حداده',
//           iconName: 'icon-cutting-metal',
//         className:'nonActive',
//         grupName:''
//       }],[
//       {
//         id: 7,
//         name: 'أسقف',
//         iconName: 'icon-house-roof',
//         className:'nonActive',
//         grupName:''
//     },
//         {
//           id: 8,
//           name: 'حوائط',
//           iconName: 'icon-brick-wall-3',
//         className:'nonActive',
//         grupName:''
        
//       }],[
//         {
//           id: 9,
//           name: 'أرضيات',
//           iconName: 'icon-wiping-swipe-for-floors',
//         className:'nonActive',
//         grupName:''
//       }
//       ]
//       ];


    // this.navParams.get('selecte');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

   categorySelected(category:Col) {
        for(let row of this.rows){
          for(let col of row){
                col.className="nonactive";
                if(col===category){
              col.className="itemActive";
                }
            }
            }
    this.selectedCat=category;
  }

  next(){
        // console.log(this.selectedCat);
        OrderService.order.serviceType=this.selectedCat.name;
    this.navCtrl.push(PickDatePage);
  }

}
