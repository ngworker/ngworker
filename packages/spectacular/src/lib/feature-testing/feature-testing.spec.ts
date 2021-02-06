import { SpectacularFeatureTestbed } from './testbed/spectacular-feature-testbed';

describe('Spectacular feature testing', () => {
  beforeEach(() => {
    SpectacularFeatureTestbed.createFeature({
      featureModule,
      featurePath,
    })
  });
});
