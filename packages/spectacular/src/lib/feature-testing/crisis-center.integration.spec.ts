import { ComponentFixture } from '@angular/core/testing';
import {
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';

import { SpectacularAppComponent } from '../application-testing/app-component/spectacular-app.component';
import { SpectacularFeatureTestbed } from './testbed/spectacular-feature-testbed';

describe('Tour of Heroes: Crisis center integration tests', () => {
  beforeEach(() => {
    rootFixture = SpectacularFeatureTestbed.createFeature({
      featureModule: CrisisCenterModule,
      featurePath: crisisCenterPath,
    });
  });

  let rootFixture: ComponentFixture<SpectacularAppComponent>;

  it('works', () => {
    expect(rootFixture).toBeDefined();
  });
});
