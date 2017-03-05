import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PickDatePage } from '../pages.ts';
import * as config from '../../herafie.config.ts';
import { OrderService } from '../../providers/order.server';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';//for animation


interface Col {

  id: number,
  name: string,
  title: string,
  iconName: string,
  className: string,
  grupName: string
}
/*
  Generated class for the Categories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
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
    ])
  ]
  
})
export class CategoriesPage {
  appTitle: string;
  appsubTitle: string;
  mainService: string;
  selectedCat: Col = {
    id: 1222222,
    title: '',
    name: 'non',
    iconName: '',
    className: 'itemActive',
    grupName: ''
  };
  rows: [Col[]];

  maintainRows: [Col[]] = [[
    {
      id: 0,
      name: "mainservices.Maintenance.sevices.Foundries",
      title: 'سباكة',
      iconName: 'icon-tap',
      className: 'nonActive',
      grupName: 'mainservices.Maintenance.title'
    }],
  [{
    id: 1,
    name: "mainservices.Maintenance.sevices.Electricity",
    title: 'كهربا',
    iconName: 'fa-plug',
    className: 'nonActive',
    grupName: 'قسم الصيانة'
  }]
    , [
    {
      id: 3,
      name: "mainservices.Maintenance.sevices.air_conditioning",
      title: 'تكييف',
      iconName: 'icon-air-conditionernew',
      className: 'nonActive',
      grupName: 'قسم الصيانة'

    }], [{

      id: 2,
      name: "mainservices.Maintenance.sevices.others",
      title: 'أخرى',
      iconName: 'icon-magic-wandnew',
      className: 'nonActive',
      grupName: ''
    }
  ]
  ];
  cleanRows: [Col[]] = [[
    {
      id: 0,
      title: "mainservices.Clean.services.Genral_Clean",
      name: 'نظافة عامة',
      iconName: 'icon-wiping-swipe-for-floors',
      className: 'nonActive',
      grupName: 'قسم النظافة'
    }],
  [{
    id: 1,
    title: "mainservices.Clean.services.Laminate_Floor",
    name: 'تلمیع الارضیات',
    iconName: 'icon-clean-floor',
    className: 'nonActive',
    grupName: 'قسم النظافة'
  }]
    , [
    {
      id: 3,
      title: "mainservices.Clean.services.Anti_Bugs",
      name: 'خدمة مكافحة حشرات',
      iconName: 'icon-roachnew  ',
      className: 'nonActive',
      grupName: 'قسم النظافة'

    }], [
    {
      id: 3,
      title: "mainservices.Clean.services.Inlay_Tanks",
      name: 'تقعیم خزانات',
      iconName: 'icon-tank-1new',
      className: 'nonActive',
      grupName: 'قسم النظافة'

    }],
  [
    {
      id: 3,
      title: "mainservices.Clean.services.Furniture_Clean",
      name: 'تنظیف اثاث',
      iconName: 'icon-vacuum-cleanernew',
      className: 'nonActive',
      grupName: 'قسم النظافة'

    }],
  [{

    id: 2,
    title: "mainservices.Clean.services.others",
    name: 'أخرى',
    iconName: 'icon-magic-wandnew',
    className: 'nonActive',
    grupName: 'النظافة'
  }
  ]
  ];
  fixRows: [Col[]] = [[
    {
      id: 0,
      title: "mainservices.Restoration_finishing.services.Installing_floors",
      name: 'تركیب ارضیات',
      iconName: 'icon-tilesnew',
      className: 'nonActive',
      grupName: 'قسم الترميم والتشطيب'
    }],
  [{
    id: 1,
    name: 'دھانات',
    title: "mainservices.Restoration_finishing.services.Paint",
    iconName: 'icon-art-painting-rollernew',
    className: 'nonActive',
    grupName: 'قسم الترميم والتشطيب'
  }]
    , [
    {
      id: 3,
      name: 'اسقف ودیكور',
      title: "mainservices.Restoration_finishing.services.roof_scenery",
      iconName: 'icon-roofnew',
      className: 'nonActive',
      grupName: 'قسم النظافة'

    }],
  [{

    id: 2,
    title: "mainservices.Restoration_finishing.services.others",
    name: 'أخرى',
    iconName: 'icon-magic-wandnew',
    className: 'nonActive',
    grupName: 'قسم الترميم والتشطيب'
  }
  ]
  ];
  elecronicRows: [Col[]] = [[
    {
      id: 0,
      title: "mainservices.Electronics.services.security_cameras",
      name: 'أنظمة مراقبة كامیرات',
      iconName: 'icon-casino-cctvnew',
      className: 'nonActive',
      grupName: 'قسم الإلكترونيات'
    }],
  [{
    id: 1,
    title: "mainservices.Electronics.services.Networks_phone",
    name: 'شبكات و سنترالات',
    iconName: 'icon-computers-network-interface-symbolnew',
    className: 'nonActive',
    grupName: 'قسم الإلكترونيات'
  }]
    , [
    {
      id: 3,
      name: 'أنظمة صوت',
      title: "mainservices.Electronics.services.sound_systems",
      iconName: 'icon-speaker-systemnew',
      className: 'nonActive',
      grupName: 'قسم الإلكترونيات'

    }],
  [
    {
      id: 3,
      title: "mainservices.Electronics.services.computers",
      name: 'الحاسب وتوابعة',
      iconName: 'fa-laptop',
      className: 'nonActive',
      grupName: 'قسم الإلكترونيات'

    }],
  [{

    id: 2,
    title: "mainservices.Electronics.services.others",
    name: 'أخرى',
    iconName: 'icon-magic-wandnew',
    className: 'nonActive',
    grupName: 'قسم الإلكترونيات'
  }
  ]
  ];
   titlestyelClass:string;

 bounceState: String = "noBounce";
  fadeState: String = "invisible";
  constructor(public orderService: OrderService, public navCtrl: NavController, public navParams: NavParams) {
   
   
    this.titlestyelClass="pagessubTitlcat_"+OrderService.lang;
    this.appTitle = config.data.appTitle;
    this.appsubTitle = config.data.appSubTitle;

    this.mainService = OrderService.order.mainServceType;


    switch (this.mainService) {
      case 'صيانة':
        this.rows = this.maintainRows;
        this.mainService = 'mainservices.Maintenance.title';
        break;
      case 'نظافة':
        this.rows = this.cleanRows;
        this.mainService = 'mainservices.Clean.title';

        break;
      case 'تشطيب وترميم':
        this.rows = this.fixRows;
        this.mainService = 'mainservices.Restoration_finishing.title';

        break;
      case 'إلكترونيات':
        this.rows = this.elecronicRows;
        this.mainService = 'mainservices.Electronics.title';
        break;
      default:
        break;
    }
    //  this.selectedCat=this.rows[0][0];


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
        this.bounceState ='bouncing';
    setTimeout(()=>{
  this.fadeState='visible';
    },700);
    console.log('ionViewDidLoad CategoriesPage');
  }

  categorySelected(category: Col) {
    for (let row of this.rows) {
      for (let col of row) {
        col.className = "nonactive";
        if (col === category) {
          col.className = "itemActive";
        }
      }
    }
    this.selectedCat = category;
    this.next();
  }

  next() {
    // console.log(this.selectedCat);
    OrderService.order.serviceType = this.selectedCat.name;
    this.navCtrl.push(PickDatePage);
  }

}
