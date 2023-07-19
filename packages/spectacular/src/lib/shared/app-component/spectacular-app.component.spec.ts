import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SpectacularAppComponent } from './spectacular-app.component';

@Component({
  template: '',
})
class TestPageComponent {}

describe(SpectacularAppComponent.name, () => {
  describe('getActiveComponent', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestPageComponent],
        imports: [
          RouterTestingModule.withRoutes([
            {
              path: '',
              component: TestPageComponent,
            },
          ]),
        ],
      });

      TestBed.compileComponents();
      fixture = TestBed.createComponent(SpectacularAppComponent);
      component = fixture.componentInstance;
      const router = TestBed.inject(Router);
      initialNavigationSync = fakeAsync(() => {
        router.initialNavigation();
        tick();
      });
    });

    let component: SpectacularAppComponent;
    let fixture: ComponentFixture<SpectacularAppComponent>;
    let initialNavigationSync: () => void;

    it('returns the top-level activated routed component after navigation', () => {
      fixture.autoDetectChanges(true);
      initialNavigationSync();

      const routedComponent = component.getActiveComponent();

      expect(routedComponent).toBeInstanceOf(TestPageComponent);
    });

    it('fails before navigation', () => {
      const act = () => {
        component.getActiveComponent();
      };

      expect(act).toThrowError('called before its view child is available');
    });

    it('fails before a routed component has been activated', () => {
      fixture.autoDetectChanges(true);

      const act = () => {
        component.getActiveComponent();
      };

      expect(act).toThrowError('Outlet is not activated');
    });
  });
});
