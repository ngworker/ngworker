import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { Routes } from '@angular/router';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';
import { featurePathToken } from '../configuration/feature-path.token';
import { SpectacularFeatureTestingModule } from './spectacular-feature-testing.module';

function routingSetup() {
  const featurePath = 'test-feature';

  TestBed.configureTestingModule({
    imports: [
      SpectacularFeatureTestingModule.withFeature({
        featurePath,
        routes: [{ path: featurePath, loadChildren: () => testFeatureRoutes }],
      }),
    ],
  }).compileComponents();

  const rootFixture = TestBed.createComponent(SpectacularAppComponent);
  const rootComponent = rootFixture.componentInstance;

  return {
    featurePath,
    rootComponent,
    rootFixture,
  };
}

@Component({
  standalone: true,
  imports: [],
  template: '',
})
class TestPageComponent {}

const testFeatureRoutes: Routes = [
  {
    path: '',
    component: TestPageComponent,
  },
];

describe(SpectacularFeatureTestingModule.name, () => {
  describe('Dependency injection', () => {
    it(`cannot be imported without using the ${SpectacularFeatureTestingModule.withFeature.name} method`, () => {
      let ngModule: SpectacularFeatureTestingModule | undefined;

      TestBed.configureTestingModule({
        imports: [SpectacularFeatureTestingModule],
      });

      expect(() => {
        ngModule = TestBed.inject(SpectacularFeatureTestingModule);
      }).toThrow();
      expect(ngModule).toBeUndefined();
    });
  });

  describe('Routing', () => {
    it(`imports the ${RouterTestingModule.name}`, () => {
      routingSetup();
      const location = TestBed.inject(Location);
      expect(location).toBeInstanceOf(SpyLocation);
    });

    it('provides the specified feature path', () => {
      const { featurePath } = routingSetup();
      const actualFeaturePath = TestBed.inject(featurePathToken);
      expect(actualFeaturePath).toBe(featurePath);
    });

    it(`makes ${SpectacularAppComponent.name} routable`, () => {
      const { rootComponent } = routingSetup();
      expect(rootComponent).toBeInstanceOf(SpectacularAppComponent);
    });

    it('registers the routes of the specified feature module', async () => {
      const { featurePath, rootComponent, rootFixture } = routingSetup();
      const router = TestBed.inject(Router);

      await rootFixture.ngZone?.run(() => router.navigate([featurePath]));
      rootFixture.detectChanges();

      expect(rootComponent.getActiveComponent()).toBeInstanceOf(
        TestPageComponent
      );
    });
  });
});
