import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import * as moment_ from 'moment';
import {Moment} from "moment";
import {LoconoxDatetimePicker} from "../datetimepicker";
import {Subscription} from "rxjs";
import {LoconoxDatetimePickerColor} from "../color";

const moment = moment_;

@Component({
  selector: 'loconox-datetimepicker-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  _today: Moment = moment();

  @Input() color: LoconoxDatetimePickerColor;

  /** The datetimepicker that this input is associated with. */
  @Input()
  set parent(value: LoconoxDatetimePicker) {
    if (!value) {
      return;
    }

    this._parent = value;

    this._parentViewSubscription = this._parent._viewChanged.subscribe((date: Moment) => {
      this.viewDate = date;
    });
  }

  _parent: LoconoxDatetimePicker;

  private _parentViewSubscription = Subscription.EMPTY;

  monthDays: Array<any> = [];

  @Input() hidden: false;

  /** The currently selected date. */
  @Input()
  get selected(): Moment | null {
    return this._selected;
  }

  set selected(value: Moment | null) {
    this._selected = value;
  }

  private _selected: Moment | null = null;

  private month: number;
  private year: number;

  @Input()
  set viewDate(value: Moment | null) {
    if (this.month != value.month() || this.year != value.year()) {
      this.month = value.month();
      this.year = value.year();
      this._generateDays(this.month, this.year);
    }
  }

  private _viewDate: Moment | null = null;

  // To be usable in view
  moment: any;

  @Output() readonly dayChange: EventEmitter<Moment> = new EventEmitter();

  constructor() {
    this.moment = moment;
  }

  _select(evt: any) {
    if (evt.target.innerHTML) {
      const selectedDay = moment(evt.target.getAttribute('data-label'), 'YYYY-MM-DD');
      if (selectedDay.isValid() && this.dayChange) {
        if (this._selected) {
          const date = this._selected.clone();
          date.year(selectedDay.year());
          date.month(selectedDay.month());
          date.date(selectedDay.date());
          this.dayChange.emit(date);
        } else {
          this.dayChange.emit(selectedDay);
        }
      }
    }
  }

  getMonthLength(month: number, year: number): number {
    const monthLength = moment(year + '-' + month, 'YYYY-MM').endOf('month').format('DD');

    return parseInt(monthLength, 10);
  }

  _generateDays(month: number, year: number) {
    // Add one month to be compatible with moment.js january = 1
    month++;
    const firstDay = moment(year + '/' + month + '/' + 1, 'YYYY/M/D');
    const startingDay = firstDay.weekday();
    const monthLength = this.getMonthLength(month, year);
    let day = 1;
    const dateArr = [];
    let dateRow = [];
    // this loop is for is weeks (rows)
    for (let i = 0; i < 9; i++) {
      // this loop is for weekdays (cells)
      dateRow = [];
      for (let j = 0; j <= 6; j++) {
        let dateCell = null;
        if (day <= monthLength && (i > 0 || j >= startingDay)) {
          dateCell = day;
          day++;
        }
        dateRow.push({day: dateCell, date: moment(year + '-' + (month) + '-' + dateCell, 'YYYY-MM-DD')});
      }
      // stop making rows if we've run out of days
      if (day > monthLength) {
        dateArr.push(dateRow);
        break;
      } else {
        dateArr.push(dateRow);
      }
    }
    this.monthDays = dateArr;
  }

  ngOnInit(): void {
    // this._generateDays(this.month, this.year);
  }

  ngOnDestroy(): void {
    this._parentViewSubscription.unsubscribe();
  }

}
