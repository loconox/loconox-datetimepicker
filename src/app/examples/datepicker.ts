import {Component} from '@angular/core';

@Component({
  templateUrl: './views/datepicker.html',
})
export class DatePickerExample {
  title = 'Basic Example';
  settings = {
    bigBanner: true,
    timePicker: false,
    defaultOpen: true,
    closeOnSelect: false,
    rangepicker: false
  };
}
