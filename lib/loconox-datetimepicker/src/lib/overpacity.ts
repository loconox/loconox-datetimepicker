import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[loconoxOverpacity]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class LoconoxOverpacityDirective {
  private el: HTMLElement;
  private restoreOpacity: string;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @Input('loconoxOverpacity') opacity: string;

  onMouseEnter() {
    this.restoreOpacity = this.el.style.opacity;
    this.el.style.opacity = this.opacity;
  }

  onMouseLeave() {
    this.el.style.opacity = this.restoreOpacity;
  }
}
