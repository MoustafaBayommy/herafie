import { Component ,Input} from '@angular/core';
import    * as config   from '../../herafie.config.ts';

/*
  Generated class for the Place directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Component({
  selector: 'herafieNav' // Attribute selector
  ,template:` <ion-navbar style="    height: 70px;
    /* height: 150%; */
    
    padding: 20px;">
   
   <button ion-button icon-only menuToggle class="menuIcon" *ngIf="withMenu">
      <ion-icon name="menu" ></ion-icon> 
    </button>
          
    <ion-title  >
      <div style="width: 50%;
    margin: auto;
    font-size: 125%;
">
     <ion-row  style="    padding: 0px;
    margin: 0px;">
      <ion-col width-50 style="    padding: 0px;
    margin: 0px;
    
    text-align:right;
    ">
       <span class="icon-icon " style="color: brown;    font-size: 300%;"> </span>   
      </ion-col>
        <ion-col width-50  style="    
    padding: 0px;
    margin: auto;
    margin-left: 10px;
    font-size: 95%;
    text-align: left;
    ">
<ion-row class="head-row">
  <ion-col width-100  style="      padding: 0px;
    margin: 0px;
    text-align: left;
    position: relative;
top: 15px;
    left: 5px;
color: #2da720; 
font-size: 80%;

    ">
       <span >{{appTitle}}</span>
  </ion-col>
</ion-row>
<ion-row  style="    padding: 0px;
    margin: 0px;">
    <ion-col width-100  style="    padding: 0px;
    margin: 0px;
        text-align: left;


    ">
 <span style="color: #b7b6b4;
    font-size: 50%;
    position: relative;
    left: 7px;">{{appsubTitle}}</span>
  </ion-col>
</ion-row>
      </ion-col>
     </ion-row>
      </div>
  
 
 </ion-title>
               <!--<ion-title style="font-size:70%;">يجعل حياتك أسهل</ion-title>-->

  </ion-navbar>
`
})
export class HerafieNavComponnent {
@Input() 
withMenu:boolean;


appTitle:string;
appsubTitle:string;
  constructor() {


  this.appTitle=config.data.appTitle;
    this.appsubTitle=config.data.appSubTitle;
  }



}
