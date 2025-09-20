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
    it('returns the top-level activated routed component after navigation', () => {
      const { component, fixture, initialNavigationSync } = setup();
      fixture.autoDetectChanges(true);
      initialNavigationSync();

      const routedComponent = component.getActiveComponent();

      expect(routedComponent).toBeInstanceOf(TestPageComponent);
    });

    it('returns the top-level activated routed component with type validation after navigation', () => {
      const { component, fixture, initialNavigationSync } = setup();
      fixture.autoDetectChanges(true);
      initialNavigationSync();

      const routedComponent = component.getActiveComponent(TestPageComponent);

      expect(routedComponent).toBeInstanceOf(TestPageComponent);
    });

    it('throws an error when the specified routed component type does not match', () => {
      const { component, fixture, initialNavigationSync } = setup();
      fixture.autoDetectChanges(true);
      initialNavigationSync();

      const act = () => {
        component.getActiveComponent(TestAnotherPageComponent);
      };

      expect(act).toThrow(
        `Unexpected routed component type. Expected ${TestAnotherPageComponent.name} but got ${TestPageComponent.name}`
      );
    });

    it('fails before navigation', () => {
      const { component } = setup();
      const act = () => {
        component.getActiveComponent();
      };

      expect(act).toThrow(
        `${SpectacularAppComponent.name}#${SpectacularAppComponent.prototype.getActiveComponent.name} called before its view child is available`
      );
    });

    it('fails before navigation with required type', () => {
      const { component } = setup();

      const act = () => {
        component.getActiveComponent(TestPageComponent);
      };

      expect(act).toThrow(
        `${SpectacularAppComponent.name}#${SpectacularAppComponent.prototype.getActiveComponent.name} called before its view child is available`
      );
    });

    it('fails before a routed component has been activated', () => {
      const { component, fixture } = setup();
      fixture.autoDetectChanges(true);

      const act = () => {
        component.getActiveComponent();
      };

      expect(act).toThrow('Outlet is not activated');
    });

    it('fails before a routed component has been activated with required type', () => {
      const { component, fixture } = setup();
      fixture.autoDetectChanges(true);

      const act = () => {
        component.getActiveComponent(TestPageComponent);
      };

      expect(act).toThrow('Outlet is not activated');
    });
  });
});
