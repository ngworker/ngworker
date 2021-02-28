import { CommonModule } from '@angular/common';
import { Component, Inject, LOCALE_ID, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createApplicationHarness } from '@ngworker/spectacular';

import { createLocaleProvider } from './create-locale-provider';
import { localeInitializer } from './locale.initializer';

@Component({
  template: `{{ value | currency: null:'code' }}`,
})
class TestLocaleComponent {
  constructor(@Inject(LOCALE_ID) readonly locale: string) {}

  value = 1234.56;
}

@NgModule({
  declarations: [TestLocaleComponent],
  imports: [CommonModule],
})
class TestLocaleModule {}

describe('localeInitializer', () => {
  it('loads and registers locale data', () => {
    const spanishLocaleCode = 'es';
    const harness = createApplicationHarness({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: TestLocaleComponent },
        ]),
        TestLocaleModule,
      ],
      providers: [createLocaleProvider(spanishLocaleCode), localeInitializer],
    });
  });

  it('loads and registers locale data', () => {
    const frenchLocaleCode = 'fr';

    TestBed.configureTestingModule({
      imports: [TestLocaleModule],
      providers: [createLocaleProvider(frenchLocaleCode), localeInitializer],
    });
    TestBed.compileComponents();

    const rootFixture = TestBed.createComponent(TestLocaleComponent);
    rootFixture.detectChanges();

    const element: HTMLElement = rootFixture.nativeElement;
    const actualLocale = element.textContent?.trim() ?? '';

    expect(actualLocale).toBe(frenchLocaleCode);
  });
});
