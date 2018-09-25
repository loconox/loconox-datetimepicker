import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {LoconoxDatetimePicker} from "./datetimepicker";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {DOWN_ARROW} from "@angular/cdk/keycodes";

import {Subscription} from "rxjs";
import * as moment_ from "moment";
import {Moment} from "moment";

const moment = moment_;


export const LOCONOX_datetimePicker_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LoconoxDatetimePickerInput),
  multi: true
};

/**
 * An event used for datetimepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use LoconoxDatepickerInputEvent instead.
 */
export class LoconoxDatepickerInputEvent {
  /** The new value for the target datetimepicker input. */
  value: Moment | null;

  constructor(
    /** Reference to the datetimepicker input component that emitted the event. */
    public target: LoconoxDatetimePickerInput,
    /** Reference to the native input element associated with the datepicker input. */
    public targetElement: HTMLElement) {
    this.value = this.target.value;
  }
}

@Directive({
  selector: 'input[loconoxDatetimePicker]',
  providers: [
    LOCONOX_datetimePicker_VALUE_ACCESSOR,
    {provide: LOCONOX_datetimePicker_VALUE_ACCESSOR, useExisting: LoconoxDatetimePickerInput},
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
export class LoconoxDatetimePickerInput implements ControlValueAccessor, OnDestroy {

  @Input() format: string = 'YYYY-MM-DD';

  /** The datetimepicker that this input is associated with. */
  @Input()
  set loconoxDatetimePicker(value: LoconoxDatetimePicker) {
    if (!value) {
      return;
    }

    this._datetimePicker = value;
    this._datetimePicker._registerInput(this);
    this._datetimePickerSubscription.unsubscribe();

    this._datetimePickerSubscription = this._datetimePicker._selectedChanged.subscribe((selected: Moment) => {
      this.value = selected;
      this._cvaOnChange(selected);
      this._onTouched();
      this.dateInput.emit(new LoconoxDatepickerInputEvent(this, this._elementRef.nativeElement));
      this.dateChange.emit(new LoconoxDatepickerInputEvent(this, this._elementRef.nativeElement));
    });
  }
  _datetimePicker: LoconoxDatetimePicker;
  
  /** The value of the input. */
  @Input()
  get value(): Moment | null { return this._value; }
  set value(value: Moment | null) {
    value = this._deserialize(value);
    this._lastValueValid = !value || value.isValid();
    value = this._getValidDateOrNull(value);
    const oldDate = this.value;
    this._value = value;
    this._formatValue(value);

    if (oldDate !== undefined && !this._sameDate(oldDate, value)) {
      this._valueChange.emit(value);
    }
  }
  protected _value: Moment | null;

  /** Whether the last value set on the input was valid. */
  protected _lastValueValid = false;

  /** Whether the datepicker-input is disabled. */
  @Input()
  get disabled(): boolean { return !!this._disabled; }
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    const element = this._elementRef.nativeElement;

    if (this._disabled !== newValue) {
      this._disabled = newValue;
      this._disabledChange.emit(newValue);
    }

    // We need to null check the `blur` method, because it's undefined during SSR.
    if (newValue && element.blur) {
      // Normally, native input elements automatically blur if they turn disabled. This behavior
      // is problematic, because it would mean that it triggers another change detection cycle,
      // which then causes a changed after checked error if the input element was focused before.
      element.blur();
    }
  }
  protected _disabled: boolean;

  /** Emits when a `change` event is fired on this `<input>`. */
  @Output() readonly dateChange: EventEmitter<LoconoxDatepickerInputEvent> =
    new EventEmitter<LoconoxDatepickerInputEvent>();

  /** Emits when an `input` event is fired on this `<input>`. */
  @Output() readonly dateInput: EventEmitter<LoconoxDatepickerInputEvent> =
    new EventEmitter<LoconoxDatepickerInputEvent>();

  /** Emits when the value changes (either due to user input or programmatic change). */
  _valueChange = new EventEmitter<Moment | null>();

  /** Emits when the disabled state has changed */
  _disabledChange = new EventEmitter<boolean>();

  _onTouched = () => {};

  private _cvaOnChange: (value: any) => void = () => {};

  private _datetimePickerSubscription = Subscription.EMPTY;

  private _localeSubscription = Subscription.EMPTY;

  constructor(
    private _elementRef: ElementRef<HTMLInputElement>) {
  }

  ngOnDestroy() {
    this._datetimePickerSubscription.unsubscribe();
    this._localeSubscription.unsubscribe();
    this._valueChange.complete();
    this._disabledChange.complete();
  }

  // Implemented as part of ControlValueAccessor.
  writeValue(value: Moment): void {
    this.value = value;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn: (value: any) => void): void {
    this._cvaOnChange = fn;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _onKeydown(event: KeyboardEvent) {
    const isAltDownArrow = event.altKey && event.keyCode === DOWN_ARROW;

    if (this._datetimePicker && isAltDownArrow && !this._elementRef.nativeElement.readOnly) {
      this._datetimePicker.open();
      event.preventDefault();
    }
  }

  _onInput(value: string) {
    let date = moment(value, this.format);
    this._lastValueValid = !date || date.isValid();
    date = this._getValidDateOrNull(date);

    if (this._lastValueValid && !date.isSame(this._value)) {
      this._value = date;
      this._cvaOnChange(date);
      this._valueChange.emit(date);
      this.dateInput.emit(new LoconoxDatepickerInputEvent(this, this._elementRef.nativeElement));
    }
  }

  _onChange() {
    this.dateChange.emit(new LoconoxDatepickerInputEvent(this, this._elementRef.nativeElement));
  }

  /** Handles blur events on the input. */
  _onBlur() {
    // Reformat the input only if we have a valid value.
    if (this.value) {
      this._formatValue(this.value);
    }

    this._onTouched();
  }

  /** Formats a value and sets it on the input element. */
  protected _formatValue(value: Moment | null) {
    this._elementRef.nativeElement.value =
      value ? value.format(this.format) : '';
  }

  protected _deserialize(value: any) {
    if (value == null || moment.isMoment(value) && value.clone().isValid()) {
      return value;
    }
    return moment.invalid();
  }

  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */
  protected _getValidDateOrNull(obj: any): Moment | null {
    return (moment.isMoment(obj) && obj.isValid()) ? obj : null;
  }

  /**
   * Checks if two dates are equal.
   * @param first The first date to check.
   * @param second The second date to check.
   * @returns Whether the two dates are equal.
   *     Null dates are considered equal to other null dates.
   */
  protected _sameDate(first: Moment | null, second: Moment | null): boolean {
    if (first && second) {
      let firstValid = first.isValid();
      let secondValid = second.isValid();
      if (firstValid && secondValid) {
        return first.isSame(second);
      }
      return firstValid == secondValid;
    }
    return first == second;
  }
}
