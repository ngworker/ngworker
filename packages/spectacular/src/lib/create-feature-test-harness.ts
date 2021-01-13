import { Location } from '@angular/common';
import { Provider, Type } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationExtras, Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TestRootComponent } from './test-root.component';
import { ensureLeadingCharacter, stripLeadingCharacter } from './util';

export interface CreateFeatureTestHarnessOptions {
  readonly featureModule: Type<unknown>;
  readonly featurePath: string;
  readonly providers?: Provider[] | Array<Provider | Provider[]>;
}

export function createFeatureTestHarness({
  featureModule,
  featurePath,
  providers = [],
}: CreateFeatureTestHarnessOptions) {
  const getTestUrl = (url: string): string => {
    return (
      router.serializeUrl(router.parseUrl(featurePath)) +
      ensureLeadingCharacter('/', url)
    );
  };
  const testCaseSetup: () => void = fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestRootComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', pathMatch: 'full', component: TestRootComponent },
          { path: featurePath, loadChildren: () => featureModule },
        ]),
      ],
      providers,
    });

    TestBed.compileComponents();

    rootFixture = TestBed.createComponent(TestRootComponent);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    rootFixture.ngZone.run(() => router.initialNavigation());
    tick();
    rootFixture.detectChanges();
  });

  let location: Location;
  let rootFixture: ComponentFixture<TestRootComponent>;
  let router: Router;

  return {
    clickButton(label: string): void {
      const button = rootFixture.debugElement
        .queryAll(By.css('button'))
        .find(b => b.nativeElement.textContent.trim() === label);

      rootFixture.ngZone.run(() =>
        button.triggerEventHandler('click', { button: 0 })
      );
    },
    detectChanges(): void {
      rootFixture.detectChanges();
    },
    enterTextInElement(query: string, text: string): void {
      const input = rootFixture.debugElement.query(By.css(query));
      const element = input.nativeElement as
        | HTMLInputElement
        | HTMLTextAreaElement;
      element.value = text;

      rootFixture.ngZone.run(() =>
        input.triggerEventHandler('input', { target: element })
      );
    },
    getPath(): string {
      const path = location.path();

      return path === '/'
        ? path
        : stripLeadingCharacter(
            '/',
            stripLeadingCharacter('/' + featurePath, path)
          );
    },
    getText(query: string): string {
      return (rootFixture.debugElement.query(By.css(query))
        .nativeElement as Element).textContent.trim();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
      commands = [featurePath, ...commands];

      return rootFixture.ngZone.run(() => router.navigate(commands, extras));
    },
    navigateByUrl(
      url: string | UrlTree,
      extras?: NavigationExtras
    ): Promise<boolean> {
      if (typeof url !== 'string') {
        url = router.serializeUrl(url);
      }

      url = getTestUrl(url);

      return rootFixture.ngZone.run(() => router.navigateByUrl(url, extras));
    },
    testCaseSetup(): void {
      testCaseSetup();
    },
  };
}
