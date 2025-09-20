import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { SpectacularAppComponent } from './spectacular-app.component';

function setup() {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([
        {
          path: '',
          component: TestPageComponent,
        },
        {
          path: 'another',
          component: TestAnotherPageComponent,
        },
      ]),
    ],
  });

  TestBed.compileComponents();
  const fixture = TestBed.createComponent(SpectacularAppComponent);
  const component = fixture.componentInstance;
  const router = TestBed.inject(Router);
  const initialNavigationSync = fakeAsync(() => {
    router.initialNavigation();
    tick();
  });

  return {
    component,
    fixture,
    initialNavigationSync,
  };
}

@Component({
  standalone: true,
  selector: 'spectacular-test-page',
  imports: [],
  template: '',
})
class TestPageComponent {}

@Component({
  standalone: true,
  selector: 'spectacular-test-another-page',
  imports: [],
  template: '',
})
class TestAnotherPageComponent {}

describe(SpectacularAppComponent.name, () => {
  describe('getActiveComponent', () => {
    describe('when called without arguments', () => {
      it('returns the top-level activated routed component after navigation', () => {
        const { component, fixture, initialNavigationSync } = setup();
        fixture.autoDetectChanges(true);
        initialNavigationSync();

        const routedComponent: unknown = component.getActiveComponent();

        expect(routedComponent).toBeInstanceOf(TestPageComponent);
      });

      it('fails before navigation', () => {
        const { component } = setup();
        const act = () => component.getActiveComponent();

        expect(act).toThrow(
          'SpectacularAppComponent#getActiveComponent called before its view child is available'
        );
      });

      it('fails before a routed component has been activated', () => {
        const { component, fixture } = setup();
        fixture.autoDetectChanges(true);

        const act = () => component.getActiveComponent();

        expect(act).toThrow('Outlet is not activated');
      });
    });

    describe('when a required routed component type is specified', () => {
      it('returns the top-level activated routed component after navigation when the specified routed component type is active', () => {
        const { component, fixture, initialNavigationSync } = setup();
        fixture.autoDetectChanges(true);
        initialNavigationSync();

        const routedComponent: TestPageComponent =
          component.getActiveComponent(TestPageComponent);

        expect(routedComponent).toBeInstanceOf(TestPageComponent);
      });

      it('fails when the specified routed component type is not active', () => {
        const { component, fixture, initialNavigationSync } = setup();
        fixture.autoDetectChanges(true);
        initialNavigationSync();

        const act = () =>
          component.getActiveComponent(TestAnotherPageComponent);

        expect(act).toThrow(
          'Unexpected routed component type. Expected TestAnotherPageComponent but got TestPageComponent'
        );
      });

      it('fails before navigation', () => {
        const { component } = setup();

        const act = () => component.getActiveComponent(TestPageComponent);

        expect(act).toThrow(
          'SpectacularAppComponent#getActiveComponent called before its view child is available'
        );
      });

      it('fails before a routed component has been activated', () => {
        const { component, fixture } = setup();
        fixture.autoDetectChanges(true);

        const act = () => component.getActiveComponent(TestPageComponent);

        expect(act).toThrow('Outlet is not activated');
      });
    });
  });
});
