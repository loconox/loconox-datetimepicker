import {TestBed, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {Directive, Input} from "@angular/core";

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Angular 2 DateTime picker 2'`, () => {
    expect(component.title).toEqual('Angular 2 DateTime picker 2');
  });

  it('can get RouterLinks from template', () => {
    // find DebugElements with an attached RouterLinkStubDirective
    let linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));

    // get attached link directive instances
    // using each DebugElement's injector
    let routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));

    expect(routerLinks.length).toBe(6, 'should have 6 routerLinks');
    expect(routerLinks[0].linkParams).toBe('/datepicker');
    expect(routerLinks[1].linkParams).toBe('/datetimepicker');
    expect(routerLinks[2].linkParams).toBe('/rangepicker');
    expect(routerLinks[3].linkParams).toBe('/simpledatepicker');
    expect(routerLinks[4].linkParams).toBe('/usinginform');
    expect(routerLinks[5].linkParams).toBe('/datetimepickerlocalized');
  });

  it('can click Heroes link in template', () => {
    // find DebugElements with an attached RouterLinkStubDirective
    let linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));

    // get attached link directive instances
    // using each DebugElement's injector
    let routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));

    let pathes = [
      '/datepicker',
      '/datetimepicker',
      '/rangepicker',
      '/simpledatepicker',
      '/usinginform',
      '/datetimepickerlocalized',
    ];

    for(let i = 0; i < 6;i++) {
      expect(routerLinks[i].navigatedTo).toBeNull('should not have navigated yet');
      linkDes[i].triggerEventHandler('click', new Event('click'));
      fixture.detectChanges();
      expect(routerLinks[i].navigatedTo).toBe(pathes[i]);
    }
  });
});
