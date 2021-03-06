import {Component} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
 
@Component({
  selector: 'loading-modal',
  templateUrl: 'loading-modal.html',
  // directives: [IONIC_DIRECTIVES] // makes all Ionic directives available to your component
})
export class LoadingModal {
 isBusy:boolean;
  constructor() {
    this.isBusy = false;
  }
 
  show(){
    this.isBusy = true;
  }
 
  hide(){
    this.isBusy = false;
  }
 
}