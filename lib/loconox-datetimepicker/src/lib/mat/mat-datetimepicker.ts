import {Directive, ElementRef, forwardRef, HostBinding, Input, OnDestroy, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import { MatFormFieldControl } from "@angular/material/form-field";
import {Subject} from "rxjs";
import {FocusMonitor} from "@angular/cdk/a11y";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {LoconoxDatepickerInputEvent, LoconoxDatetimePickerInput} from "../datetimepicker-input";
import {Moment} from "moment";
import {LoconoxDatetimePicker} from "../datetimepicker";

@Directive({
  selector: 'input[loconoxMatDatetimePicker]',
  providers: [
    {provide: MatFormFieldControl, useExisting: MatLoconoxDatetimePicker}
  ],
  host: {
    '[attr.aria-haspopup]': 'true',
    '[attr.aria-owns]': '(_datetimePicker?.opened && _datetimePicker.id) || null',
    '[disabled]': 'disabled',
    '(input)': '_onInput($event.target.value)',
    '(change)': '_onChange()',
    '(blur)': '_onBlur()',
    '(keydown)': '_onKeydown($event)',
  },
})
export class MatLoconoxDatetimePicker extends LoconoxDatetimePickerInput implements MatFormFieldControl<Moment>, ControlValueAccessor, OnDestroy {

  constructor(@Optional() @Self() public ngControl: NgControl, private fm: FocusMonitor, private elRef: ElementRef<HTMLInputElement>) {
    super(elRef);
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this._valueChange.subscribe(() => {
      this.stateChanges.next();
    });
    this._disabledChange.subscribe(() => {
      this.stateChanges.next();
    });
  }

  stateChanges = new Subject<void>();

  /** The datetimepicker that this input is associated with. */
  @Input()
  set loconoxMatDatetimePicker(value: LoconoxDatetimePicker) {
    this.loconoxDatetimePicker = value;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  static nextId = 0;

  @HostBinding() id = `mat-loconox-datetimepicker-${MatLoconoxDatetimePicker.nextId++}`;

  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  private _placeholder: string;

  focused = false;

  get empty() {
    return !this._value;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get required() {
    return this._required;
  }

  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  private _required = false;

  errorState = false;

  controlType = 'mat-loconox-datetimepicker';

  @HostBinding('attr.aria-describedby') describedBy = '';

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    // No focus is handled for now
  }
}
