import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DatePickerExample} from './examples/datepicker';
import {DateTimePickerExample} from './examples/datetimepicker';
import {SimpleDatePickerExample} from './examples/simpledatepicker';
import {DateTimePickerLocalizedExample} from './examples/datetimepickerlocalized';
import {MatDatePickerExample} from "./examples/mat-datetimepicker";
import {DatePickerColoredExample} from "./examples/datepickercolored";
import {DatepickerFormControl} from "./examples/datepicker-form-control";

const appRoutes: Routes = [
  {path: '', redirectTo: '/datepicker', pathMatch: 'full'},
  {path: 'datepicker', component: DatePickerExample},
  {path: 'datetimepicker', component: DateTimePickerExample},
  {path: 'simpledatepicker', component: SimpleDatePickerExample},
  {path: 'datetimepickerlocalized', component: DateTimePickerLocalizedExample},
  {path: 'matdatetimepicker', component: MatDatePickerExample},
  {path: 'datepickercolored', component: DatePickerColoredExample},
  {path: 'datepickerformcontrol', component: DatepickerFormControl},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]

})
export class AppRouterModule {
}
