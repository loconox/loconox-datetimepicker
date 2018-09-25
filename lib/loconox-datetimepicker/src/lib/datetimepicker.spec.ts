import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoconoxDatetimePickerComponent } from './datetimepicker';

describe('LoconoxDatetimePickerComponent', () => {
  let component: LoconoxDatetimePickerComponent;
  let fixture: ComponentFixture<LoconoxDatetimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoconoxDatetimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoconoxDatetimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
