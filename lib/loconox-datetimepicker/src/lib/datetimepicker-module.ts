import {NgModule} from '@angular/core';
import {LoconoxDatetimePicker} from './datetimepicker';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CalendarComponent} from './calendar/calendar.component';
import {ClickOutsideDirective} from './clickOutside';
import * as moment_ from 'moment';
import {MatLoconoxDatetimePicker} from "./mat/mat-datetimepicker";
import {LoconoxDatetimePickerInput} from "./datetimepicker-input";

const moment = moment_;

@NgModule({
  imports: [
    CommonModule, FormsModule,
  ],
  declarations: [LoconoxDatetimePicker, ClickOutsideDirective, CalendarComponent, MatLoconoxDatetimePicker, LoconoxDatetimePickerInput],
  exports: [LoconoxDatetimePicker, MatLoconoxDatetimePicker, LoconoxDatetimePickerInput]
})
export class LoconoxDatetimePickerModule {
}
