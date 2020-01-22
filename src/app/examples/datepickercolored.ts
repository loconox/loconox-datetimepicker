import {Component} from '@angular/core';
import {LoconoxDatetimePickerColor} from "loconox-datetimepicker";

@Component({
  templateUrl: './datepickercolored.html',
})
export class DatePickerColoredExample {
  title = 'Colored Example';
  settings = {
    bigBanner: true,
    timePicker: true,
    defaultOpen: true,
    closeOnSelect: false,
    rangepicker: false
  };
  color: LoconoxDatetimePickerColor = new LoconoxDatetimePickerColor({
    primary: '#ff55c9',
    secondary: '#f0ef00',
    third: 'black',
  });
}
