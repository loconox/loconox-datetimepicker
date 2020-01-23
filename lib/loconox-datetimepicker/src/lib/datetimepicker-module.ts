import {NgModule} from '@angular/core';
import {LoconoxDatetimePicker} from './datetimepicker';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CalendarComponent} from './calendar/calendar.component';
import {ClickOutsideDirective} from './clickOutside';
import * as moment_ from 'moment';
import {MatLoconoxDatetimePicker} from "./mat/mat-datetimepicker";
import {LoconoxDatetimePickerInput} from "./datetimepicker-input";
import {YearView} from "./year/year-view";
import {LoconoxHighlightDirective} from "./highlight";
import {LoconoxOverpacityDirective} from "./overpacity";
import {LoconoxOverStyleDirective} from "./overstyle";
import {MonthView} from "./month/month-view";
import {TimeView} from "./time/time-view";

const moment = moment_;

@NgModule({
  imports: [
    CommonModule, FormsModule,
  ],
  declarations: [
    LoconoxDatetimePicker, ClickOutsideDirective, CalendarComponent, MatLoconoxDatetimePicker,
    LoconoxDatetimePickerInput, YearView, LoconoxHighlightDirective, LoconoxOverpacityDirective,
    LoconoxOverStyleDirective, MonthView, TimeView
  ],
  exports: [
    LoconoxDatetimePicker, MatLoconoxDatetimePicker, LoconoxDatetimePickerInput
  ]
})
export class LoconoxDatetimePickerModule {
}
