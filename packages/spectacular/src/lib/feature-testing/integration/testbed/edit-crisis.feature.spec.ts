import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CrisisCenterModule,
  crisisCenterPath,
  CrisisService,
} from '@tour-of-heroes/crisis-center';

@Component({
  selector: 'spectacular-test-app',
  template: '<router-outlet><router-outlet>',
})
class TestAppComponent {}

describe('[TestBed] Tour of Heroes: Crisis center', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: crisisCenterPath, loadChildren: () => CrisisCenterModule },
        ]),
      ],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });

    rootFixture = TestBed.createComponent(TestAppComponent);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    crisisService = TestBed.inject(CrisisService);
    navigate = (commands, extras) =>
      rootFixture.ngZone?.run(() => router.navigate(commands, extras)) ??
      Promise.resolve(true);
    await navigate([crisisCenterPath]);
  });

  const findCrisisCenterHomeGreeting = () => {
    const greeting = rootFixture.debugElement
      .queryAll(By.css('p'))
      .map(paragraph => paragraph.nativeElement)
      .find(element =>
        /welcome to the crisis center/i.test(element.textContent)
      );

    if (!greeting) {
      throw new Error('Could not find crisis center home greeting');
    }

    return greeting;
  };
  const findNameControl = () => {
    const nameControl = rootFixture.debugElement
      .queryAll(By.css('input'))
      .map(input => input.nativeElement as HTMLInputElement)
      .find(element => /name/i.test(element.placeholder));

    if (!nameControl) {
      throw new Error('Could not find name control');
    }

    return nameControl;
  };
  const findSaveButton = () => {
    const saveButton = rootFixture.debugElement
      .queryAll(By.css('button'))
      .map(button => button.nativeElement)
      .find(
        (element: HTMLButtonElement) => element.textContent?.trim() === 'Save'
      );

    if (!saveButton) {
      throw new Error('Could not find save button');
    }

    return saveButton;
  };
  const findSelectedCrisis = () =>
    rootFixture.debugElement.query(By.css('.selected a'))
      .nativeElement as HTMLAnchorElement;

  let crisisService: CrisisService;
  let location: Location;
  let navigate: Router['navigate'];
  let rootFixture: ComponentFixture<TestAppComponent>;
  let router: Router;

  it('Edit crisis from crisis detail', async () => {
    const [aCrisis] = crisisService.getCrises().value;
    await navigate([crisisCenterPath, aCrisis.id]);
    const newCrisisName = 'Global climate crisis';

    findNameControl().value = newCrisisName;
    findNameControl().dispatchEvent(new Event('input'));
    findSaveButton().click();
    await rootFixture.whenStable();

    expect(findCrisisCenterHomeGreeting().textContent).toBe(
      'Welcome to the Crisis Center'
    );
    expect(findSelectedCrisis().textContent?.trim()).toBe(
      `${aCrisis.id}${newCrisisName}`
    );
    expect(location.path()).toBe(
      `/${crisisCenterPath};id=${aCrisis.id};foo=foo`
    );
  });
});
