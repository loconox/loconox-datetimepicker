import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import * as moment_ from 'moment';
import {Moment} from "moment";
import {LoconoxDatetimePicker} from "../datetimepicker";
import {Subscription} from "rxjs";
import {LoconoxDatetimePickerColor} from "../color";

const moment = moment_;

@Component({
  selector: 'loconox-datetimepicker-month-view',
  templateUrl: './month-view.html',
  styleUrls: ['./month-view.scss']
})
export class MonthView implements OnDestroy {

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

  @Input()
  get viewDate(): Moment | null {
    return this._viewDate;
  }

  set viewDate(value: Moment | null) {
    this._viewDate = value;
  }

  private _viewDate: Moment | null;

  // To be usable in view
  moment: any;

  @Output() readonly monthChange: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.moment = moment;
  }

  setMonth(evt: any) {
    if (evt.target.getAttribute('id')) {
      const selectedMonth = moment.monthsShort().indexOf(evt.target.getAttribute('id'));
      this.monthChange.emit(selectedMonth);
    }
  }

  ngOnDestroy(): void {
    this._parentViewSubscription.unsubscribe();
  }
}
