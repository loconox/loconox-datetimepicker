# Loconox DateTime Picker

### Overview 

Loconox DateTime Picker is an angular 2 component for date and time picking. It has localizing feature with [moment.js](http://momentjs.com/) lib.

It is based on [cuppalabs datetime picker](http://cuppalabs.github.io/components/datepicker).

### Installation
- The LoconoxDatetimePicker package is published on the [npm](https://www.npmjs.com/package/loconox-datetimepicker) Registry. 
-  Install the package with [npm](https://www.npmjs.com): 

```js
	npm install loconox-datetimepicker
```

### Usage

Import `Angular2Datetimepicker2Module` into your `AppModule`

```js
import {LoconoxDatetimePickerModule} from 'loconox-datetimepicker';

@NgModule({
  // ...
  imports: [
    LoconoxDatetimePickerModule,
  ]
  // ...
})

```
Declare the component data variables and options in your component where you want to consume the dropdown component.

```js 
import { Component, OnInit } from '@angular/core';

export class AppComponent implements OnInit {
    
	settings = {
		bigBanner: true,
		timePicker: false,
		defaultOpen: true
	}
}

```

Add the following component tag in the template where your want to place the datepicker

```html
  <input [loconoxDatetimePicker]="picker" (click)="picker.open($event)">
  <loconox-datetimepicker #picker [settings]="settings"></loconox-datetimepicker>

```


### Settings

Following `settings` object properties can be used to configure the component.

|Property	|Type	|Default	|Description	|
|:--- |:--- |:--- |:--- |
|bigBanner|Boolean|true| The banner section to show the date details.  |
|defaultOpen|Boolean|false|To open the datepicker popover on load. Default is set to false.|
|timePicker|Boolean|false|Enable time picker feature.|
|closeOnSelect|Boolean|true|to close the popover on date select or on click of done button.|
|locale|string|en|The locale in which date will be displayed|
|hour24|boolean|false|Hour in 24h mode|


## Callback Methods

- `dateChange`

Define a callback method to be called on date change. `$event` is a `LoconoxDatepickerInputEvent`.

```html
  <input [loconoxDatetimePicker]="picker" (click)="picker.open($event)" (dateChange)="onDateChange($event)">
  <loconox-datetimepicker #picker [settings]="settings"></loconox-datetimepicker>
```

- `dateInput`

Define a callback method to be called on select of the date. `$event` is a `LoconoxDatepickerInputEvent`.

```html
  <input [loconoxDatetimePicker]="picker" (click)="picker.open($event)" (dateInput)="onDateInput($event)">
  <loconox-datetimepicker #picker [settings]="settings"></loconox-datetimepicker>
```

- `opened`

Define a callback method to be called on the open of the calendar.

```html
  <input [loconoxDatetimePicker]="picker" (click)="picker.open($event)">
  <loconox-datetimepicker #picker [settings]="settings" (opened)="onOpen($event)"></loconox-datetimepicker>
```

- `closed`

Define a callback method to be called on the close of the calendar.

```html
  <input [loconoxDatetimePicker]="picker" (click)="picker.open($event)">
  <loconox-datetimepicker #picker [settings]="settings" (closed)="onClose($event)"></loconox-datetimepicker>
```

## Date Formats Support

format string is based on the formats supported by moment.js. See [moment.js documentation](http://momentjs.com/docs/#/displaying/format/).

## Run examples

To run example, see [Development server section](#development-server)

# Development

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## License
MIT License.

## Credits
Thanks to Pradeep Kumar Terli, Font Awesome and Moment.js for the libraries.

## Author
Jérémie Libeau
