import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  OnDestroy, ViewChild,
} from '@angular/core';
import {Settings} from './settings';
import * as moment_ from 'moment';
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {Subject, Subscription} from "rxjs";
import {Moment} from "moment";
import {LoconoxDatetimePickerInput} from "./datetimepicker-input";
import {CalendarComponent} from "./calendar/calendar.component";

const moment = moment_;

/** Used to generate a unique ID for each datepicker instance. */
let datetimepickerUid = 0;

@Component({
  selector: 'loconox-datetimepicker',
  templateUrl: './datetimepicker.html',
  styleUrls: ['./datetimepicker.scss'],
})
export class LoconoxDatetimePicker implements OnInit, OnDestroy {

  // To be usable in view
  moment: any;

  // Today
  viewDate: Moment = moment();

  hourValue = 0;
  minValue = 0;
  timeViewMeridian = '';
  timeView = false;
  yearView: Boolean = false;
  yearsList: Array<any> = [];
  monthsView = false;

  defaultSettings: Settings = {
    defaultOpen: false,
    bigBanner: true,
    timePicker: false,
    closeOnSelect: true,
    locale: 'en',
    hour24: false
  };

  @Input()
  settings: Settings;

  /** The input element this datepicker is associated with. */
  _datepickerInput: LoconoxDatetimePickerInput;

  /** Emits when the datepicker has been opened. */
  @Output('opened') openedStream: EventEmitter<void> = new EventEmitter<void>();

  /** Emits when the datepicker has been closed. */
  @Output('closed') closedStream: EventEmitter<void> = new EventEmitter<void>();

  /** Whether the datepicker pop-up should be disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled !== undefined ? !!this._disabled : false;
  }

  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);

    if (newValue !== this._disabled) {
      this._disabled = newValue;
      this._disabledChange.next(newValue);
    }
  }

  private _disabled: boolean;

  @Input()
  get opened(): boolean {
    return this._opened;
  }

  set opened(value: boolean) {
    value ? this.open() : this.close();
  }

  private _opened = false;

  /** The id for the datepicker calendar. */
  id: string = `loconox-datetimepicker-${datetimepickerUid++}`;

  /** The currently selected date. */
  get _selected(): Moment | null {
    return this._validSelected;
  }

  set _selected(value: Moment | null) {
    this._validSelected = value;
  }

  private _validSelected: Moment | null = null;

  /** Subscription to value changes in the associated input element. */
  private _inputSubscription = Subscription.EMPTY;

  /** Emits when the datepicker is disabled. */
  readonly _disabledChange = new Subject<boolean>();

  /** Emits new selected date when selected date changes. */
  readonly _selectedChanged = new Subject<Moment>();

  /** Emits new selected date when selected date changes. */
  readonly _viewChanged = new Subject<Moment>();

  /**
   * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
   * than a popup and elements have more padding to allow for bigger touch targets.
   */
  @Input()
  get touchUi(): boolean {
    return this._touchUi;
  }

  set touchUi(value: boolean) {
    this._touchUi = coerceBooleanProperty(value);
  }

  private _touchUi = false;

  @ViewChild(CalendarComponent) calendar: CalendarComponent;

  constructor() {
    this.moment = moment;
  }

  /** Selects the given date */
  select(date: Moment): void {
    let oldValue = this._selected;
    this._selected = date;
    this.initDate();
    if (!this._sameDate(oldValue, this._selected)) {
      this._selectedChanged.next(date);
      this._viewChanged.next(date);
    }

    if (this.settings.closeOnSelect) {
      this._opened = false;
    }
  }

  /**
   * Register an input with this datepicker.
   * @param input The datepicker input to register with this datepicker.
   */
  _registerInput(input: LoconoxDatetimePickerInput): void {
    if (this._datepickerInput) {
      throw Error('A MatDatepicker can only be associated with a single input.');
    }
    this._datepickerInput = input;
    this._inputSubscription =
      this._datepickerInput._valueChange.subscribe((value: Moment | null) => this._selected = value);
  }

  /** Open the calendar. */
  open(e?: Event): void {
    if (this._opened || this.disabled) {
      return;
    }

    this._opened = true;
    this.openedStream.emit();
    if (e !== undefined) {
      e.stopPropagation();
    }
  }

  /** Close the calendar. */
  close(): void {
    if (!this._opened) {
      return;
    }

    this._opened = false;
    this.closedStream.emit();
  }

  ngOnInit() {
    this.settings = Object.assign(this.defaultSettings, this.settings);
    if (this.settings.defaultOpen) {
      this.open();
    }
    moment.locale(this.settings.locale);
  }

  ngOnDestroy() {
    this.close();
    this._inputSubscription.unsubscribe();
    this._disabledChange.complete();
  }

  initDate() {
    const hourValue = this._selected.hours();
    this.minValue = this._selected.minutes();
    if (!this.settings.hour24) {
      if (hourValue <= 11) {
        this.timeViewMeridian = 'AM';
      } else {
        this.hourValue = hourValue - 12;
        this.timeViewMeridian = 'PM';
      }
      if (hourValue === 0 || hourValue === 12) {
        this.hourValue = 12;
      }
    }
  }

  _generateYearList(param: string) {
    let startYear = null;
    if (param === 'next') {
      startYear = this.yearsList[8] + 1;
    } else if (param === 'prev') {
      startYear = this.yearsList[0] - 9;
    } else {
      const currentYear = this._selected ? this._selected.year() : this.viewDate.year();
      startYear = currentYear - 4;
    }
    for (let k = 0; k < 9; k++) {
      this.yearsList[k] = startYear + k;
    }
  }

  getMonthLength(month: number, year: number): number {
    const monthLength = moment(year + '-' + month, 'YYYY-MM').endOf('month').format('DD');

    return parseInt(monthLength, 10);
  }

  toggleMonthView() {
    this.yearView = false;
    this.timeView = false;
    this.monthsView = !this.monthsView;
  }

  toggleYearView() {
    this.yearView = !this.yearView;
    this.monthsView = false;
    this.timeView = false;
    this._generateYearList('current');
  }

  toggleTimeView() {
    this.yearView = false;
    this.monthsView = false;
    this.timeView = !this.timeView;
  }

  toggleMeridian(val: string) {
    this.timeViewMeridian = val;
  }

  setTimeView() {
    if (!this.settings.hour24) {
      if (this.timeViewMeridian === 'AM') {
        if (this.hourValue === 12) {
          this._selected.hours(0);
        } else {
          this._selected.hours(this.hourValue);
        }
        this._selected.minutes(this.minValue);
      } else {
        if (this.hourValue === 12) {
          this._selected.hours(this.hourValue);
        } else {
          this._selected.hours(this.hourValue + 12);
        }
        this._selected.minutes(this.minValue);
      }
    } else {
      this._selected.hours(this.hourValue);
      this._selected.minutes(this.minValue);
    }
    this._selectedChanged.next(this._selected);
    this.timeView = !this.timeView;
  }

  setYear(evt: any) {
    if (evt.target.getAttribute('id')) {
      const selectedYear = parseInt(evt.target.getAttribute('id'), 10);
      if (!this._selected) {
        this._selected = this.viewDate.clone();
      }
      this._selected.years(selectedYear);
      this.viewDate.year(selectedYear);
      this._viewChanged.next(this.viewDate);
      this.yearView = !this.yearView;
    }
  }

  setMonth(evt: any) {
    if (evt.target.getAttribute('id')) {
      const selectedMonth = moment.monthsShort().indexOf(evt.target.getAttribute('id'));
      if (!this._selected) {
        this._selected = this.viewDate.clone();
      }
      this._selected.month(selectedMonth);
      this.viewDate.month(selectedMonth);
      this._viewChanged.next(this.viewDate);
      this.monthsView = !this.monthsView;
    }
  }

  prevMonth(e: any) {
    e.stopPropagation();
    if (this.viewDate.month() === 0) {
      this.viewDate.month(11);
      this.viewDate.years(this.viewDate.years() - 1);
    } else {
      const prevmonthLength = this.getMonthLength(this.viewDate.month(), this.viewDate.year());
      const currentDate = this.viewDate.date();
      if (currentDate > prevmonthLength) {
        this.viewDate.date(prevmonthLength);
      }
      this.viewDate.month(this.viewDate.month() - 1);
    }
    this._viewChanged.next(this.viewDate);
  }

  nextMonth(e: any) {
    e.stopPropagation();
    if (this.viewDate.month() === 11) {
      this.viewDate.month(0);
      this.viewDate.years(this.viewDate.years() + 1);
    } else {
      const nextmonthLength = this.getMonthLength(this.viewDate.month(), this.viewDate.year());
      const currentDate = this.viewDate.date();
      if (currentDate > nextmonthLength) {
        this.viewDate.date(nextmonthLength);
      }
      this.viewDate.month(this.viewDate.month() + 1);
    }
    this._viewChanged.next(this.viewDate);
  }

  incHour() {
    if (!this.settings.hour24 && this.hourValue < 12 || this.settings.hour24 && this.hourValue < 24) {
      this.hourValue += 1;
    }
  }

  decHour() {
    if (this.hourValue > 1) {
      this.hourValue -= 1;
    }
  }

  incMinutes() {
    if (this.minValue < 59) {
      this.minValue += 1;
    }
  }

  decMinutes() {
    if (this.minValue > 0) {
      this.minValue -= 1;
    }
  }

  /**
   * Checks if two dates are equal.
   * @param first The first date to check.
   * @param second The second date to check.
   * @returns Whether the two dates are equal.
   *     Null dates are considered equal to other null dates.
   */
  private _sameDate(first: Moment | null, second: Moment | null): boolean {
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
