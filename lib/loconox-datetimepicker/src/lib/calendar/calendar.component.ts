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

  @Input()
  get viewDate(): Moment | null {
    return this._viewDate;
  }

  set viewDate(value: Moment | null) {
    this._viewDate = value;
    if (this._viewDate) {
      this._generateDays(this._viewDate.month(), this.viewDate.year());
    }
  }

  private _viewDate: Moment | null = null;

  // To be usable in view
  moment: any;

  @Output() readonly selectedChange: EventEmitter<Moment> = new EventEmitter();

  constructor() {
    this.moment = moment;
  }

  _select(evt: any) {
    if (evt.target.innerHTML) {
      const selectedDay = moment(evt.target.getAttribute('data-label'), 'YYYY-MM-DD');
      if (selectedDay.isValid() && this.selectedChange) {
        if (this._selected) {
          const date = this._selected.clone();
          date.year(selectedDay.year());
          date.month(selectedDay.month());
          date.date(selectedDay.date());
          this.selectedChange.emit(date);
        } else {
          this.selectedChange.emit(selectedDay);
        }
      }
    }
  }

  getMonthLength(month: number, year: number): number {
    const monthLength = moment(year + '-' + month, 'YYYY-MM').endOf('month').format('DD');

    return parseInt(monthLength, 10);
  }

  _generateDays(month: number, year: number) {
    month++;
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();
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
    this.monthDays =  dateArr;
  }

  ngOnInit(): void {
    this._generateDays(this.viewDate.month(), this.viewDate.year());
  }

  ngOnDestroy(): void {
    this._parentViewSubscription.unsubscribe();
  }

}
