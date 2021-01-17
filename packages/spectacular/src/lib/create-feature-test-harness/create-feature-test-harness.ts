import { Location } from '@angular/common';
import { NgZone } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationExtras, Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TestRootComponent } from '../test-root/test-root.component';
import { TestRootScam } from '../test-root/test-root.scam';
import { CreateFeatureTestHarnessOptions } from './create-feature-test-harness-options';
import { FeatureTestHarness } from './feature-test-harness';
import { createLeftMouseClick } from './util-dom';
import { ensureLeadingCharacter, stripLeadingCharacter } from './util-text';

/**
 * Create a test harness for the specified Angular feature module. Test
 * as-a-user by navigating, clicking, entering text, querying text and
 * asserting the URL.
 */
export function createFeatureTestHarness({
  featureModule,
  featurePath,
  providers = [],
}: CreateFeatureTestHarnessOptions): FeatureTestHarness {
  const getTestUrl = (url: string): string => {
    return (
      router.serializeUrl(router.parseUrl(featurePath)) +
      ensureLeadingCharacter('/', url)
    );
  };
  const testCaseSetup: () => void = fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', pathMatch: 'full', component: TestRootComponent },
          { path: featurePath, loadChildren: () => featureModule },
        ]),
        TestRootScam,
      ],
      providers,
    });

    TestBed.compileComponents();

    rootFixture = TestBed.createComponent(TestRootComponent);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    if (!rootFixture.ngZone) {
      throw new Error('No NgZone registered.');
    }

    ngZone = rootFixture.ngZone;

    ngZone.run(() => router.initialNavigation());
    tick();
    rootFixture.detectChanges();
  });

  let location: Location;
  let ngZone: NgZone;
  let rootFixture: ComponentFixture<TestRootComponent>;
  let router: Router;

  return {
    clickButton(label: string): void {
      const button = rootFixture.debugElement
        .queryAll(By.css('button'))
        .find(b => b.nativeElement.textContent.trim() === label);

      if (!button) {
        throw new Error(`No button with label "${label}" found.`);
      }

      ngZone.run(() =>
        button.triggerEventHandler('click', createLeftMouseClick())
      );
    },
    detectChanges(): void {
      rootFixture.detectChanges();
    },
    enterTextInElement(text: string, query: string): void {
      const input = rootFixture.debugElement.query(By.css(query));
      const element = input.nativeElement as
        | HTMLInputElement
        | HTMLTextAreaElement;
      element.value = text;

      ngZone.run(() => input.triggerEventHandler('input', { target: element }));
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
      const debugElement = rootFixture.debugElement.query(By.css(query));
      const element: Element = debugElement.nativeElement;

      if (!element) {
        throw new Error(`Could not find element using query "${query}"`);
      }

      return element.textContent?.trim() ?? '';
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
      commands = [featurePath, ...commands];

      return ngZone.run(() => router.navigate(commands, extras));
    },
    navigateByUrl(
      url: string | UrlTree,
      extras?: NavigationExtras
    ): Promise<boolean> {
      if (typeof url !== 'string') {
        url = router.serializeUrl(url);
      }

      url = getTestUrl(url);

      return ngZone.run(() => router.navigateByUrl(url, extras));
    },
    testCaseSetup(): void {
      testCaseSetup();
    },
  };
}
