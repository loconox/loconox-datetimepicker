import {Component} from '@angular/core';

@Component({
  templateUrl: './datepicker.html',
})
export class SimpleDatePickerExample {
  date: Date = new Date();

  title = 'Simple Picker Example';

  settings = {
    bigBanner: false,
    timePicker: false,
    format: 'YYYY-MM-DD hh:mm a',
    defaultOpen: true
  };
}
