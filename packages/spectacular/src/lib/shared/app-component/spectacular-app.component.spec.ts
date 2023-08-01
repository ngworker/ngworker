import { provideLocationMocks } from '@angular/common/testing';
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
      ]),
      provideLocationMocks(),
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
  imports: [],
  template: '',
})
class TestPageComponent {}

describe(SpectacularAppComponent.name, () => {
  describe('getActiveComponent', () => {
    it('returns the top-level activated routed component after navigation', () => {
      const { component, fixture, initialNavigationSync } = setup();
      fixture.autoDetectChanges(true);
      initialNavigationSync();

      const routedComponent = component.getActiveComponent();

      expect(routedComponent).toBeInstanceOf(TestPageComponent);
    });

    it('fails before navigation', () => {
      const { component } = setup();
      const act = () => {
        component.getActiveComponent();
      };

      expect(act).toThrowError('called before its view child is available');
    });

    it('fails before a routed component has been activated', () => {
      const { component, fixture } = setup();
      fixture.autoDetectChanges(true);

      const act = () => {
        component.getActiveComponent();
      };

      expect(act).toThrowError('Outlet is not activated');
    });
  });
});
