import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CrisisCenterModule, crisisCenterPath } from '@tour-of-heroes/crisis-center';

import { featurePathToken } from '../configuration/feature-path.token';
import { SpectacularFeatureTestingModule } from '../feature-testing-module/spectacular-feature-testing.module';
import { routerReplacingProvider } from './router-replacing.provider';
import { SpectacularFeatureRouter } from './spectacular-feature-router';

describe('routerReplacingProvider', () => {
  it(`replaces ${Router.name} when a feature path is provided and ${RouterTestingModule.name} is imported`, () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: featurePathToken,
          useValue: 'crisis-center',
        },
        routerReplacingProvider,
      ],
    });

    const router = TestBed.inject(Router, null);

    expect(router).toBeInstanceOf(SpectacularFeatureRouter);
  });

  // eslint-disable-next-line max-len
  it(`replaces ${Router.name} when ${SpectacularFeatureTestingModule.name}.${SpectacularFeatureTestingModule.withFeature.name} is imported`, () => {
    TestBed.configureTestingModule({
      imports: [
        SpectacularFeatureTestingModule.withFeature({
          featureModule: CrisisCenterModule,
          featurePath: crisisCenterPath,
        }),
      ],
      providers: [routerReplacingProvider],
    });

    const router = TestBed.inject(Router, null);

    expect(router).toBeInstanceOf(SpectacularFeatureRouter);
  });
});
