import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  @Output()
  public clickOutside = new EventEmitter<MouseEvent>();

  constructor(private _elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    //const clickedInside = this._elementRef.nativeElement.contains(targetElement);


    if (!this.childOf(targetElement, this._elementRef.nativeElement)) {
      this.clickOutside.emit();
    }
  }

  private childOf(child, parent) {
    while ((child = child.parentNode) && child !== parent) ;
    return !!child;
  }
}
