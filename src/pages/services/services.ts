import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CategoriesPage} from '../pages';
import {Order} from '../order';
import    * as config   from '../../herafie.config.ts';
import {OrderService} from '../../providers/order.server';




interface Col {

  id: number,
  name: string,
  iconName: string,
    className:string

}
/*
  Generated class for the Services page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-services',
  templateUrl: 'services.html'
})
export class ServicesPage {
 appTitle:string;
  appsubTitle:string;
  selectedService:Col={
  id:0,
  name:'قسم الصيانة',
  iconName:'icon-verification-of-delivery-list-clipboard-symbol',
      className:'itemActive'

};
  rows:[Col[]];
  constructor(public orderService:OrderService,public navCtrl: NavController, public navParams: NavParams) {

    console.log(OrderService.order.placetype);
 this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;
this.rows=[[{
  id:0,
  name:'قسم الصيانة',
  iconName:'fa-wrench',
      className:'itemActive'

}],[{
    id:0,
  name:'قسم النظافة',
  iconName:'icon-carpetnew',
      className:'nonActive'

}
],[ { id:0,
  name:'قسم الترميم والتشطيب',
  iconName:'icon-key-1',
      className:'nonActive'
}],[ { id:0,
  name:'قسم الإلكترونيات',
  iconName:'icon-computernew',
      className:'nonActive'
}]

];


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');


  }

   selecteService(service:Col) {
       for(let row of this.rows){
          for(let col of row){
                col.className="nonactive";
                if(col===service){
              col.className="itemActive";
                }
            }
            }
  
    this.selectedService=service;
    // console.log(place);
  }

   next(){
        // console.log(this.selectedPlace);
    OrderService.order.mainServceType=this.selectedService.name;
    this.navCtrl.push(CategoriesPage);
  }

}
