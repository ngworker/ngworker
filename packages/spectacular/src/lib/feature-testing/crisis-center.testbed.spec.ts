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
    await rootFixture.ngZone?.run(() => router.navigate([crisisCenterPath]));
  });

  let crisisService: CrisisService;
  let location: Location;
  let rootFixture: ComponentFixture<TestAppComponent>;
  let router: Router;

  describe('Editing a crisis', () => {
    it('navigates to the crisis center home with the crisis selected when the change is saved', async () => {
      const [aCrisis] = crisisService.getCrises().value;
      await rootFixture.ngZone?.run(() =>
        router.navigate([crisisCenterPath, aCrisis.id])
      );
      const inputElement: HTMLInputElement = rootFixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      const saveButtonElement: HTMLButtonElement = rootFixture.debugElement
        .queryAll(By.css('button'))
        .map(button => button.nativeElement)
        .find(
          (buttonElement: HTMLButtonElement) =>
            buttonElement.textContent?.trim() === 'Save'
        );
      const newCrisisName = 'Global climate crisis';

      inputElement.value = newCrisisName;
      inputElement.dispatchEvent(new Event('input'));
      saveButtonElement.click();
      await rootFixture.whenStable();

      const welcomeText: HTMLElement = rootFixture.debugElement.query(
        By.css('p')
      ).nativeElement;
      const selectedCrisis: HTMLElement = rootFixture.debugElement.query(
        By.css('.selected')
      ).nativeElement;
      expect(welcomeText.textContent).toBe('Welcome to the Crisis Center');
      expect(selectedCrisis.textContent?.trim()).toBe(
        `${aCrisis.id}${newCrisisName}`
      );
      expect(location.path()).toBe(
        `/${crisisCenterPath};id=${aCrisis.id};foo=foo`
      );
    });
  });
});
