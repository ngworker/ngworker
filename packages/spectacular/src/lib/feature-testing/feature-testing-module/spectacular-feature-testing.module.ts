import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { TestRootComponent } from '../../test-root/test-root.component';
import { featurePathToken } from '../configuration/feature-path.token';
import { SpectacularFeatureTestingModuleOptions } from './spectacular-feature-testing-module-options';
import { SpectacularFeatureTestingRootModule } from './spectacular-feature-testing-root.module';

@NgModule()
export class SpectacularFeatureTestingModule {
  static withFeature<TFeatureModule>({
    featureModule,
    featurePath,
    routerOptions = {},
  }: SpectacularFeatureTestingModuleOptions<TFeatureModule>): ModuleWithProviders<SpectacularFeatureTestingRootModule> {
    const {
      providers: routerTestingProviders = [],
    } = RouterTestingModule.withRoutes(
      [
        { path: '', pathMatch: 'full', component: TestRootComponent },
        { path: featurePath, loadChildren: () => featureModule },
      ],
      routerOptions
    );

    return {
      ngModule: SpectacularFeatureTestingRootModule,
      providers: [
        ...routerTestingProviders,
        {
          provide: featurePathToken,
          useValue: featurePath,
        },
      ],
    };
  }

  constructor() {
    throw new Error(
      'Do not import SpectacularFeatureTestingModule directly. Use SpectacularFeatureTestingModule.withFeature.'
    );
  }
}
