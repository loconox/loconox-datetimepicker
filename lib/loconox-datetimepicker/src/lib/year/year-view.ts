import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import * as moment_ from 'moment';
import {Moment} from "moment";
import {LoconoxDatetimePicker} from "../datetimepicker";
import {Subscription} from "rxjs";
import {LoconoxDatetimePickerColor} from "../color";

const moment = moment_;

@Component({
  selector: 'year-view',
  templateUrl: './year-view.html',
  styleUrls: ['./year-view.scss']
})
export class YearView implements OnDestroy {


  yearsList: Array<any> = [];

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
    this.generateYearList('current');
  }

  private _viewDate: Moment | null;

  // To be usable in view
  moment: any;

  @Output() readonly yearChange: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.moment = moment;
  }

  generateYearList(param: string) {
    let startYear = null;
    if (param === 'next') {
      startYear = this.yearsList[8] + 1;
    } else if (param === 'prev') {
      startYear = this.yearsList[0] - 9;
    } else {
      const currentYear = this.viewDate.year();
      startYear = currentYear - 4;
    }
    for (let k = 0; k < 9; k++) {
      this.yearsList[k] = startYear + k;
    }
  }

  selectYear(evt: any) {
    if (evt.target.getAttribute('id')) {
      const selectedYear = parseInt(evt.target.getAttribute('id'), 10);
      this.yearChange.emit(selectedYear);
    }
  }

  ngOnDestroy(): void {
    this._parentViewSubscription.unsubscribe();
  }
}
