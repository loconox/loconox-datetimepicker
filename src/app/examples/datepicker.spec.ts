import {TestBed, ComponentFixture} from '@angular/core/testing';
import {DatePickerExample} from "./datepicker";
import {Angular2Datetimepicker2Module} from "../../../lib/loconox-datetimepicker/src/lib/datetimepicker-module";
import {FormsModule} from "@angular/forms";
import * as moment_ from 'moment';
import {BrowserModule, By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
const moment = moment_;

describe('DatePickerExample', () => {
  let component: DatePickerExample;
  let fixture: ComponentFixture<DatePickerExample>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Angular2Datetimepicker2Module, FormsModule, BrowserModule],
      declarations: [DatePickerExample, ],
    }).compileComponents();
    fixture = TestBed.createComponent(DatePickerExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Basic Example'`, () => {
    expect(component.title).toEqual('Basic Example');
  });

  it('should have a title tag', () => {
    const dom: HTMLElement = fixture.nativeElement;
    const p = dom.querySelector('h2');
    expect(p.textContent).toEqual(component.title);
  });

  it('should have the date', () => {
    const dom: HTMLElement = fixture.nativeElement;
    const p = dom.querySelector('.wc-date-container > span');
    expect(p.textContent).toEqual(moment(component.date).format(component.settings.format));
  });

  it('should be opened', () => {
    const dom: HTMLElement = fixture.nativeElement;
    const pop: HTMLElement = dom.querySelector('.wc-date-popover');
    expect(pop.hidden).toEqual(false);
  });

  it('should show years', () => {
    const dom: DebugElement = fixture.debugElement;
    const yearsView: DebugElement = dom.query(By.css('.years-view'));
    const dropDown: DebugElement = dom.query(By.css('.year-dropdown'));
    expect(yearsView.properties.hidden).toEqual(true);
    /*dropDown.triggerEventHandler('click', null);
    expect(yearsView.properties.hidden).toEqual(false);*/
  });
});
