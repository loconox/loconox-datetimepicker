import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  templateUrl: './datepicker-form-control.html',
})
export class DatepickerFormControl {
  date: Date = new Date();

  title = 'Picker with form control';

  settings = {
    bigBanner: false,
    timePicker: false,
    format: 'YYYY-MM-DD hh:mm a',
    defaultOpen: true
  };
  control: FormControl;

  constructor() {
    this.control = new FormControl();
    this.control.setValue(new Date());
  }

  onChange($event) {
    console.log(this.control.value);
  }
}
