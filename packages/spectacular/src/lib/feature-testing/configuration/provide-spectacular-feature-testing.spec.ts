import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router, RouterConfigOptions, withRouterConfig } from '@angular/router';
import * as classicCrisisCenter from '@tour-of-heroes-classic/crisis-center';
import * as standaloneCrisisCenter from '@tour-of-heroes-standalone/crisis-center';
import { SpectacularFeatureLocation } from '../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../navigation/spectacular-feature-router';
import { featurePathToken } from './feature-path.token';
import {
  provideSpectacularFeatureTesting,
  ProvideSpectacularFeatureTestingOptions,
} from './provide-spectacular-feature-testing';
import { withInitialFeatureNavigation } from './with-initial-feature-navigation';

const classicCrisisCenterFeature: ProvideSpectacularFeatureTestingOptions = {
  featurePath: classicCrisisCenter.crisisCenterPath,
  routes: [
    {
      path: classicCrisisCenter.crisisCenterPath,
      loadChildren: () => classicCrisisCenter.CrisisCenterModule,
    },
  ],
};
const standaloneCrisisCenterFeature: ProvideSpectacularFeatureTestingOptions = {
  featurePath: standaloneCrisisCenter.crisisCenterPath,
  routes: [
    {
      path: standaloneCrisisCenter.crisisCenterPath,
      loadChildren: () => standaloneCrisisCenter.crisisCenterRoutes,
    },
  ],
};
const emptyFeature: ProvideSpectacularFeatureTestingOptions = {
  featurePath: '',
  routes: [],
};

describe(provideSpectacularFeatureTesting.name, () => {
  describe('Given empty options are specified', () => {
    it('Then the feature-aware router is provided', () => {
      TestBed.configureTestingModule({
        providers: [provideSpectacularFeatureTesting(emptyFeature)],
      });

      const featureRouter = TestBed.inject(SpectacularFeatureRouter);
      expect(featureRouter).toBeInstanceOf(SpectacularFeatureRouter);
    });

    it('Then the feature-aware location is provided', () => {
      TestBed.configureTestingModule({
        providers: [provideSpectacularFeatureTesting(emptyFeature)],
      });

      const featureLocation = TestBed.inject(SpectacularFeatureLocation);
      expect(featureLocation).toBeInstanceOf(SpectacularFeatureLocation);
    });

    it('Then the Angular Router is provided', () => {
      TestBed.configureTestingModule({
        providers: [provideSpectacularFeatureTesting(emptyFeature)],
      });

      const router = TestBed.inject(Router);
      expect(router).toBeInstanceOf(Router);
    });
  });

  describe('Given a feature path is specified', () => {
    it('Then a feature path is provided', () => {
      const expectedFeaturePath = 'heroes';
      TestBed.configureTestingModule({
        providers: [
          provideSpectacularFeatureTesting({
            ...emptyFeature,
            featurePath: expectedFeaturePath,
          }),
        ],
      });

      const actualFeaturePath = TestBed.inject(featurePathToken);
      expect(actualFeaturePath).toBe(expectedFeaturePath);
    });
  });

  describe('Given a feature is specified', () => {
    it.each([classicCrisisCenterFeature, standaloneCrisisCenterFeature])(
      `
    When the test navigates
    Then the native Location API is unaffected`,
      async feature => {
        TestBed.configureTestingModule({
          providers: [provideSpectacularFeatureTesting(feature)],
        });
        const router = TestBed.inject(Router);

        await router.navigate([feature.featurePath]);

        expect(location.pathname).not.toBe('/crisis-center');
      }
    );
  });

  describe('Given an Angular Router feature is specified', () => {
    it('Then the Angular Router feature is provided', async () => {
      const expectedUrlUpdateStrategy: RouterConfigOptions['urlUpdateStrategy'] =
        'eager';
      TestBed.configureTestingModule({
        providers: [
          provideSpectacularFeatureTesting(
            emptyFeature,
            withRouterConfig({
              urlUpdateStrategy: expectedUrlUpdateStrategy,
            })
          ),
        ],
      });

      const router = TestBed.inject(Router);
      expect(router.urlUpdateStrategy).toBe(expectedUrlUpdateStrategy);
    });
  });

  describe('Given a Feature Testing feature is specified', () => {
    it.each([classicCrisisCenterFeature, standaloneCrisisCenterFeature])(
      'Then the Feature Testing feature is provided',
      feature => {
        TestBed.configureTestingModule({
          providers: [
            provideSpectacularFeatureTesting(
              feature,
              withInitialFeatureNavigation()
            ),
          ],
        });

        const angularLocation = TestBed.inject(Location);
        expect(angularLocation.path()).toBe('/crisis-center');
      }
    );
  });
});
