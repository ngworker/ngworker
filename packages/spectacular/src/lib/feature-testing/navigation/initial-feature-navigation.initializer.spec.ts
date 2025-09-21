import type { ResolveFn } from '@angular/router';
import { ignoreDevelopmentModeLog } from '@internal/test-util';
import { createApplicationHarness } from '../../application-testing/application-harness/create-application-harness';
import { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';
import { provideSpectacularFeatureTesting } from '../configuration/provide-spectacular-feature-testing';
import { initialFeatureNavigationInitializer } from './initial-feature-navigation.initializer';
import { SpectacularFeatureLocation } from './spectacular-feature-location';

describe('initialFeatureNavigationInitializer', () => {
  beforeEach(() => {
    ignoreDevelopmentModeLog();
  });

  const featurePath = 'admin';

  it('navigates to the default feature route when the specified feature route is registered', async () => {
    const harness = await createApplicationHarness({
      providers: [
        provideSpectacularFeatureTesting({
          featurePath: 'admin',
          routes: [
            {
              path: featurePath,
              component: SpectacularAppComponent,
            },
          ],
        }),
        initialFeatureNavigationInitializer,
      ],
    });

    const location = harness.inject(SpectacularFeatureLocation);
    expect(location.path()).toBe('~/');
  });

  it('fails when the specified feature route has not been registered', () => {
    const act = async () =>
      await createApplicationHarness({
        providers: [
          provideSpectacularFeatureTesting({
            featurePath: 'admin',
            routes: [
              {
                path: featurePath + '-oh-no',
                component: SpectacularAppComponent,
              },
            ],
          }),
          initialFeatureNavigationInitializer,
        ],
      });

    expect(act).rejects.toThrow('Cannot match any routes');
  });

  it('fails when the default feature route fails to load', () => {
    const errorMessage = 'Failed to load route data';
    const failToLoad: ResolveFn<never> = () => {
      throw new Error(errorMessage);
    };

    const act = async () =>
      await createApplicationHarness({
        providers: [
          provideSpectacularFeatureTesting({
            featurePath: 'admin',
            routes: [
              {
                path: featurePath,
                component: SpectacularAppComponent,
                resolve: {
                  test: failToLoad,
                },
              },
            ],
          }),
          initialFeatureNavigationInitializer,
        ],
      });

    expect(act).rejects.toThrow(errorMessage);
  });
});
