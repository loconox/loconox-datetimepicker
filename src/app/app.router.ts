import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {DatePickerExample} from './examples/datepicker';
import {DateTimePickerExample} from './examples/datetimepicker';
import {SimpleDatePickerExample} from './examples/simpledatepicker';
import {UsingWithFormExample} from './examples/usingWithForms';
import {DateTimePickerLocalizedExample} from './examples/datetimepickerlocalized';
import {MatDatePickerExample} from "./examples/mat-datetimepicker";

const appRoutes: Routes = [
  {path: '', redirectTo: '/datepicker', pathMatch: 'full'},
  {path: 'datepicker', component: DatePickerExample},
  {path: 'datetimepicker', component: DateTimePickerExample},
  {path: 'simpledatepicker', component: SimpleDatePickerExample},
  {path: 'usinginform', component: UsingWithFormExample},
  {path: 'datetimepickerlocalized', component: DateTimePickerLocalizedExample},
  {path: 'matdatetimepicker', component: MatDatePickerExample},

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
