import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[lcStyleOver]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class LoconoxOverStyleDirective {
  private el: HTMLElement;
  private restoreStyle: {};

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @Input('lcStyleOver') style: CSSStyleDeclaration;

  onMouseEnter() {
    this.restoreStyle = {};

    for(let prop in this.style) {
      if (this.style.hasOwnProperty(prop)) {
        this.restoreStyle[prop] = this.el.style[prop];
        this.el.style[prop] = this.style[prop];
      }
    }
  }

  onMouseLeave() {
    for(let prop in this.restoreStyle) {
      if (this.style.hasOwnProperty(prop)) {
        this.el.style[prop] = this.restoreStyle[prop];
      }
    }
    this.restoreStyle = {};
  }
}
