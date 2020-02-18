import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import * as moment_ from 'moment';
import {Moment} from "moment";
import {LoconoxDatetimePicker} from "../datetimepicker";
import {Subscription} from "rxjs";
import {LoconoxDatetimePickerColor} from "../color";

const moment = moment_;

@Component({
  selector: 'loconox-datetimepicker-time-view',
  templateUrl: './time-view.html',
  styleUrls: ['./time-view.scss']
})
export class TimeView implements OnDestroy {

  _hourValue = 0;
  _minValue = 0;

  get _timeViewMeridian() {
    return this.__timeViewMeridian;
  }

  set _timeViewMeridian(value) {
    this.__timeViewMeridian = value;
  }

  __timeViewMeridian = '';

  @Input()
  hour24 = false;

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

  @Input() hidden: false;

  @Input() color: LoconoxDatetimePickerColor;

  get viewDate(): Moment | null {
    return this._viewDate;
  }

  @Input()
  set viewDate(value: Moment | null) {
    this._viewDate = value;
    if (!this.hour24) {
      if (value.hours() === 0) {
        this._hourValue = 12;
      }
      else if (value.hours() > 12) {
        this._hourValue = value.hours() - 12;
      }
    } else {
      this._hourValue = value.hours();
    }
    this._minValue = value.minutes();
    this._timeViewMeridian = value.format('A');
  }

  private _viewDate: Moment | null;

  // To be usable in view
  moment: any;

  @Output() readonly timeChange: EventEmitter<{ hour: number, minute: number }> = new EventEmitter();

  constructor() {
    this.moment = moment;
  }

  incHour() {
    if (this.hour24) {
      if (this._hourValue < 23) {
        this._hourValue++;
      }
    } else {
      if (this._hourValue === 12) {
        this._hourValue = 1;
      } else if (this._hourValue < 11) {
        this._hourValue++;
      }
    }
  }

  decHour() {
    if (this.hour24) {
      if (this._hourValue > 0) {
        this._hourValue--;
      }
    } else {
      if (this._hourValue === 1) {
        this._hourValue = 12;
      } else if (this._hourValue > 1 && this._hourValue < 12) {
        this._hourValue--;
      }
    }
  }

  incMinutes() {
    if (this._minValue < 59) {
      this._minValue += 1;
    }
  }

  decMinutes() {
    if (this._minValue > 0) {
      this._minValue -= 1;
    }
  }

  toggleMeridian(val: string) {
    this._timeViewMeridian = val;
  }

  setTimeView() {
    if (!this.hour24) {
      if (this._timeViewMeridian === 'AM') {
        if (this._hourValue === 12) {
          this.timeChange.emit({hour: 0, minute: this._minValue});
        } else {
          this.timeChange.emit({hour: this._hourValue, minute: this._minValue});
        }
      } else {
        if (this._hourValue === 12) {
          this.timeChange.emit({hour: this._hourValue, minute: this._minValue});
        } else {
          this.timeChange.emit({hour: this._hourValue + 12, minute: this._minValue});
        }
      }
    } else {
      this.timeChange.emit({hour: this._hourValue, minute: this._minValue});
    }
  }

  ngOnDestroy(): void {
    this._parentViewSubscription.unsubscribe();
  }
}
