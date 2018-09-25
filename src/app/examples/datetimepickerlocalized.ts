import {Component} from '@angular/core';

@Component({
  templateUrl: './views/datetimepickerlocalized.html',
})
export class DateTimePickerLocalizedExample {
  date: Date = new Date();

  title = 'Datetime Picker Example with localization';

  settings = {
    bigBanner: true,
    timePicker: true,
    defaultOpen: true,
    locale: 'fr',
    hour24: true,
  };
}
