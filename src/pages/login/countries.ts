import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';


@Component( {
  templateUrl: 'countries.html'})
export class Countries {

 constructor(public viewCtrl: ViewController) {

 }

 dismiss(code) {
   this.viewCtrl.dismiss(code);
 }
 select(code){
this.dismiss(code);
 }

}