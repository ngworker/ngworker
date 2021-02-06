import { createUserInteractions, UserInteractions } from '@internal/test-util';
import { CrisisCenterModule, crisisCenterPath } from '@tour-of-heroes/crisis-center';

import { SpectacularFeatureTestbed } from './testbed/spectacular-feature-testbed';

describe('Tour of Heroes: Crisis center integration tests', () => {
  beforeEach(() => {
    const rootFixture = SpectacularFeatureTestbed.createFeature({
      featureModule: CrisisCenterModule,
      featurePath: crisisCenterPath,
    });
    ui = createUserInteractions(rootFixture);
  });

  // let rootFixture: ComponentFixture<SpectacularAppComponent>;
  let ui: UserInteractions;

  it('works', () => {
    expect(ui).toBeDefined();
  });
});
