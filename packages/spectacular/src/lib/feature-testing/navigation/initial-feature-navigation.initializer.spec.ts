import { Injectable, ValueProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Resolve } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SpectacularAppComponent } from '../../application-testing/app-component/spectacular-app.component';
import { SpectacularAppScam } from '../../application-testing/app-component/spectacular-app.scam';
import { createApplicationHarness } from '../../application-testing/application-harness/create-application-harness';
import { featurePathToken } from '../configuration/feature-path.token';
import { initialFeatureNavigationInitializer } from './initial-feature-navigation.initializer';
import { SpectacularFeatureLocation } from './spectacular-feature-location';

describe('initialFeatureNavigationInitializer', () => {
  const featurePath = 'admin';
  const featurePathProvider: ValueProvider = {
    provide: featurePathToken,
    useValue: featurePath,
  };

  it('navigates to the default feature route when the specified feature route is registered', () => {
    createApplicationHarness({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: featurePath,
            component: SpectacularAppComponent,
          },
        ]),
        SpectacularAppScam,
      ],
      providers: [featurePathProvider, initialFeatureNavigationInitializer],
    });

    const location = TestBed.inject(SpectacularFeatureLocation);

    expect(location.path()).toBe('~/');
  });

  it('fails when the specified feature route has not been registered', () => {
    const act = () =>
      createApplicationHarness({
        imports: [
          RouterTestingModule.withRoutes([
            {
              path: featurePath + '-oh-no',
              component: SpectacularAppComponent,
            },
          ]),
          SpectacularAppScam,
        ],
        providers: [featurePathProvider, initialFeatureNavigationInitializer],
      });

    expect(act).toThrowError('Cannot match any routes');
  });

  it('fails when the default feature route fails to load', () => {
    const errorMessage = 'Failed to load route data';
    @Injectable({ providedIn: 'root' })
    class FailingRouteResolver implements Resolve<never> {
      resolve(): never {
        throw new Error(errorMessage);
      }
    }

    const act = () =>
      createApplicationHarness({
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
        providers: [featurePathProvider, initialFeatureNavigationInitializer],
      });

    expect(act).toThrowError(errorMessage);
  });
});
