import { Directive ,ElementRef, Renderer,HostListener } from '@angular/core';

/*
  Generated class for the Place directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[place]' // Attribute selector
})
export class PlaceDirective {

  constructor(public element: ElementRef, public renderer: Renderer) {
    console.log('Hello Place Directive');
  }

      ngOnInit(){
     console.log( this.element.nativeElement);
    

                }

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.getElementsByClassName('apartment')[0]
    this.renderer.setElementStyle(this.element.nativeElement.getElementsByClassName('apartment')[0],'color','#211fe2');
    }

}
