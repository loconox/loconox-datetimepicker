import {Component} from '@angular/core';

@Component({
  templateUrl: './datetimepicker.html',
})
export class DateTimePickerExample {
  title: string = "Datetime Picker Example";
  settings = {
    bigBanner: true,
    timePicker: true,
    defaultOpen: true,
    hour24: false
  };
}
