import {Component} from '@angular/core';
import {
  LoconoxDatetimePickerInput
} from "../../../lib/loconox-datetimepicker/src/lib/datetimepicker-input";

@Component({
  templateUrl: './datetimepickerlocalized.html',
})
export class DateTimePickerLocalizedExample {

  title = 'Datetime Picker Example with localization';

  settings = {
    bigBanner: true,
    timePicker: true,
    defaultOpen: true,
    locale: 'fr',
    hour24: true,
  };
  format = 'YYYY-MM-DD HH:mm';
  date = '2017-05-01 12:10';

  onChange(e: LoconoxDatetimePickerInput) {
    console.log(e.value);
  }
}
