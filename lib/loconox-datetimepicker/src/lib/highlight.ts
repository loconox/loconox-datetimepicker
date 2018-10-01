import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[loconoxHightlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class LoconoxHighlightDirective {
  private el: HTMLElement;
  private restoreBG: string;
  private restoreColor: string;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @Input() loconoxHightlight: { bg: string, color: string, cond?: boolean};

  onMouseEnter() {
    if (this.loconoxHightlight.cond === undefined || this.loconoxHightlight.cond) {
      this.restoreBG = this.el.style.backgroundColor;
      this.restoreColor = this.el.style.color;
      this.el.style.backgroundColor = this.loconoxHightlight.bg;
      this.el.style.color = this.loconoxHightlight.color;
    }
  }

  onMouseLeave() {
    if (this.loconoxHightlight.cond === undefined || this.loconoxHightlight.cond) {
      this.el.style.backgroundColor = this.restoreBG;
      this.el.style.color = this.restoreColor;
    }
  }
}
