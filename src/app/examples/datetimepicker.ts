import {Component} from '@angular/core';

@Component({
  templateUrl: './views/datetimepicker.html',
})
export class DateTimePickerExample {
  title: string = "Datetime Picker Example";
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    defaultOpen: true
  };
}
