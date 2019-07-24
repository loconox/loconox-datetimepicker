import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRouterModule} from './app.router';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {RouterModule} from "@angular/router";
import {MatDatePickerExample} from "./examples/mat-datetimepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {DatePickerExample} from './examples/datepicker';
import {DateTimePickerExample} from './examples/datetimepicker';
import {SimpleDatePickerExample} from './examples/simpledatepicker';
import {DateTimePickerLocalizedExample} from './examples/datetimepickerlocalized';
import {DatePickerColoredExample} from "./examples/datepickercolored";
import {LoconoxDatetimePickerModule} from "../../lib/loconox-datetimepicker/src/lib/datetimepicker-module";

@NgModule({
  declarations: [
    AppComponent,
    DatePickerExample,
    DateTimePickerExample,
    SimpleDatePickerExample,
    DateTimePickerLocalizedExample,
    MatDatePickerExample,
    DatePickerColoredExample,
  ],
  imports: [
    BrowserModule,
    LoconoxDatetimePickerModule,
    FormsModule, ReactiveFormsModule,
    AppRouterModule,
    AngularFontAwesomeModule,
    RouterModule,
    MatFormFieldModule, MatInputModule, MatIconModule, BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
