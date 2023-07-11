import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ignoreDevelopmentModeLog } from '@internal/test-util';
import { createApplicationHarness } from '../../application-testing/application-harness/create-application-harness';
import { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';
import { SpectacularAppScam } from '../../shared/app-component/spectacular-app.scam';
import { provideSpectacularFeatureTest } from '../configuration/provide-spectacular-feature-test';
import { initialFeatureNavigationInitializer } from './initial-feature-navigation.initializer';
import { SpectacularFeatureLocation } from './spectacular-feature-location';

describe('initialFeatureNavigationInitializer', () => {
  beforeEach(() => {
    ignoreDevelopmentModeLog();
  });

  const featurePath = 'admin';

  it('navigates to the default feature route when the specified feature route is registered', async () => {
    const harness = await createApplicationHarness({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: featurePath,
            component: SpectacularAppComponent,
          },
        ]),
        SpectacularAppScam,
      ],
      providers: [
        provideSpectacularFeatureTest({
          featurePath: 'admin',
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
        imports: [
          RouterTestingModule.withRoutes([
            {
              path: featurePath + '-oh-no',
              component: SpectacularAppComponent,
            },
          ]),
          SpectacularAppScam,
        ],
        providers: [
          provideSpectacularFeatureTest({
            featurePath: 'admin',
          }),
          initialFeatureNavigationInitializer,
        ],
      });

    expect(act).rejects.toThrowError('Cannot match any routes');
  });

  it('fails when the default feature route fails to load', () => {
    const errorMessage = 'Failed to load route data';
    @Injectable({ providedIn: 'root' })
    class FailingRouteResolver implements Resolve<never> {
      resolve(): never {
        throw new Error(errorMessage);
      }
    }

    const act = async () =>
      await createApplicationHarness({
        imports: [
          RouterTestingModule.withRoutes([
            {
              path: featurePath,
              component: SpectacularAppComponent,
              resolve: {
                test: FailingRouteResolver,
              },
            },
          ]),
          SpectacularAppScam,
        ],
        providers: [
          provideSpectacularFeatureTest({
            featurePath: 'admin',
          }),
          initialFeatureNavigationInitializer,
        ],
      });

    expect(act).rejects.toThrowError(errorMessage);
  });
});
