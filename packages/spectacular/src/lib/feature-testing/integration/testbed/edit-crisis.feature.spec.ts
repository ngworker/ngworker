import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import * as classicCrisisCenter from '@tour-of-heroes-classic/crisis-center';
import * as standaloneCrisisCenter from '@tour-of-heroes-standalone/crisis-center';
import { ProvideSpectacularFeatureTestingOptions } from '../../configuration/provide-spectacular-feature-testing';

type TestSetupOptions = ProvideSpectacularFeatureTestingOptions & {
  readonly CrisisService: Type<
    classicCrisisCenter.CrisisService | standaloneCrisisCenter.CrisisService
  >;
};

async function setup({ CrisisService, featurePath, routes }: TestSetupOptions) {
  const findCrisisCenterHomeGreeting = () => {
    const greeting = rootFixture.debugElement
      .queryAll(By.css('p'))
      .map(paragraph => paragraph.nativeElement)
      .find(element =>
        /welcome to the crisis center/i.test(element.textContent),
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
        (element: HTMLButtonElement) => element.textContent?.trim() === 'Save',
      );

    if (!saveButton) {
      throw new Error('Could not find save button');
    }

    return saveButton;
  };
  const findSelectedCrisis = () =>
    rootFixture.debugElement.query(By.css('.selected a'))
      .nativeElement as HTMLAnchorElement;

  TestBed.configureTestingModule({
    providers: [
      { provide: ComponentFixtureAutoDetect, useValue: true },
      provideRouter(routes),
    ],
  });

  const rootFixture = TestBed.createComponent(TestAppComponent);
  const location = TestBed.inject(Location);
  const router = TestBed.inject(Router);
  const crisisService = TestBed.inject(CrisisService);
  const navigate: Router['navigate'] = (commands, extras) =>
    rootFixture.ngZone?.run(() => router.navigate(commands, extras)) ??
    Promise.resolve(true);
  await navigate([featurePath]);

  return {
    crisisService,
    findCrisisCenterHomeGreeting,
    findNameControl,
    findSaveButton,
    findSelectedCrisis,
    navigate,
    location,
    rootFixture,
    router,
  };
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'spectacular-test-app',
  imports: [RouterOutlet],
  template: '<router-outlet><router-outlet>',
})
class TestAppComponent {}

const testCases: readonly TestSetupOptions[] = [
  {
    CrisisService: classicCrisisCenter.CrisisService,
    featurePath: classicCrisisCenter.crisisCenterPath,
    routes: [
      {
        path: classicCrisisCenter.crisisCenterPath,
        loadChildren: () => classicCrisisCenter.CrisisCenterModule,
      },
    ],
  },
  {
    CrisisService: standaloneCrisisCenter.CrisisService,
    featurePath: standaloneCrisisCenter.crisisCenterPath,
    routes: [
      {
        path: standaloneCrisisCenter.crisisCenterPath,
        loadChildren: () => standaloneCrisisCenter.crisisCenterRoutes,
      },
    ],
  },
];

describe('[TestBed] Tour of Heroes: Crisis center', () => {
  it.each(testCases)('Edit crisis from crisis detail', async testCase => {
    const {
      crisisService,
      findCrisisCenterHomeGreeting,
      findNameControl,
      findSaveButton,
      findSelectedCrisis,
      location,
      navigate,
      rootFixture,
    } = await setup(testCase);
    const [aCrisis] = crisisService.getCrises().value;
    await navigate([testCase.featurePath, aCrisis.id]);
    const newCrisisName = 'Global climate crisis';

    findNameControl().value = newCrisisName;
    findNameControl().dispatchEvent(new Event('input'));
    findSaveButton().click();
    await rootFixture.whenStable();

    expect(findCrisisCenterHomeGreeting().textContent).toBe(
      'Welcome to the Crisis Center',
    );
    expect(findSelectedCrisis().textContent?.trim()).toBe(
      `${aCrisis.id}${newCrisisName}`,
    );
    expect(location.path()).toBe(
      `/${testCase.featurePath};id=${aCrisis.id};foo=foo`,
    );
  });
});
