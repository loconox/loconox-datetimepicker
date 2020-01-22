import {Component} from '@angular/core';

@Component({
  templateUrl: './mat-datetimepicker.html',
})
export class MatDatePickerExample {
  title = 'Material DateTime Picker Example';
  settings = {
    bigBanner: true,
    timePicker: true,
    closeOnSelect: false,
    rangepicker: false
  };
  date = new Date();
  format = 'YYYY-MM-DD HH:mm a';
}
