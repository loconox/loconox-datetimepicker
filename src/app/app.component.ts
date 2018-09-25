import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 2 DateTime picker 2';
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'YYYY-MM-DD',
    defaultOpen: true
  };
}
