import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpectacularFeatureLocation } from '../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../navigation/spectacular-feature-router';
import { featurePathToken } from './feature-path.token';
import { provideSpectacularFeatureTest } from './provide-spectacular-feature-test';

describe(provideSpectacularFeatureTest.name, () => {
  describe('Given a feature path is specified', () => {
    it('Then a feature path is provided', () => {
      const expectedFeaturePath = 'heroes';

      TestBed.configureTestingModule({
        providers: [
          provideSpectacularFeatureTest({ featurePath: expectedFeaturePath }),
        ],
      });

      const actualFeaturePath = TestBed.inject(featurePathToken);
      expect(actualFeaturePath).toBe(expectedFeaturePath);
    });

    it('Then the feature-aware router is provided', () => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes([])],
        providers: [
          provideSpectacularFeatureTest({ featurePath: 'crisis-center' }),
        ],
      });

      const featureRouter = TestBed.inject(SpectacularFeatureRouter);
      expect(featureRouter).toBeInstanceOf(SpectacularFeatureRouter);
    });

    it('Then the feature-aware location is provided', () => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes([])],
        providers: [
          provideSpectacularFeatureTest({ featurePath: 'crisis-center' }),
        ],
      });

      const featureLocation = TestBed.inject(SpectacularFeatureLocation);
      expect(featureLocation).toBeInstanceOf(SpectacularFeatureLocation);
    });
  });
});
