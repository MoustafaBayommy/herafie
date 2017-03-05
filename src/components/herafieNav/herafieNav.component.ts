
import { Component ,Input} from '@angular/core';
import    * as config   from '../../herafie.config.ts';

/*
  Generated class for the Place directive.
  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Component({
  selector: 'herafieNav' // Attribute selector
  ,templateUrl:`herafieNav.html`
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
