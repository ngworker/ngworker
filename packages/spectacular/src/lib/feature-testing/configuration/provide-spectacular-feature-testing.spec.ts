import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router, RouterConfigOptions, withRouterConfig } from '@angular/router';
import {
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';
import { SpectacularFeatureLocation } from '../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../navigation/spectacular-feature-router';
import { featurePathToken } from './feature-path.token';
import {
  provideSpectacularFeatureTesting,
  ProvideSpectacularFeatureTestingOptions,
} from './provide-spectacular-feature-testing';
import { withInitialFeatureNavigation } from './with-initial-feature-navigation';

const crisisCenterFeature: ProvideSpectacularFeatureTestingOptions = {
  featurePath: crisisCenterPath,
  routes: [{ path: crisisCenterPath, loadChildren: () => CrisisCenterModule }],
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
    it(`
    When the test navigates
    Then the native Location API is unaffected`, async () => {
      TestBed.configureTestingModule({
        providers: [provideSpectacularFeatureTesting(crisisCenterFeature)],
      });
      const router = TestBed.inject(Router);

      await router.navigate([crisisCenterFeature.featurePath]);

      expect(location.pathname).not.toBe('/crisis-center');
    });
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
    it('Then the Feature Testing feature is provided', () => {
      TestBed.configureTestingModule({
        providers: [
          provideSpectacularFeatureTesting(
            crisisCenterFeature,
            withInitialFeatureNavigation()
          ),
        ],
      });

      const angularLocation = TestBed.inject(Location);
      expect(angularLocation.path()).toBe('/crisis-center');
    });
  });
});
