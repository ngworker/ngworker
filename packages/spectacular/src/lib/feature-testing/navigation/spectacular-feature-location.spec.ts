import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';

import { featurePathToken } from '../configuration/feature-path.token';
import { SpectacularFeatureLocation } from './spectacular-feature-location';

const featurePath = 'villains-job-board';

describe(SpectacularFeatureLocation.name, () => {
  function setInitialFeatureRoute(routePath: string): void {
    const initialPath = `/${featurePath}/${routePath}`;

    locationStub.setInitialPath(initialPath);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Location, useClass: SpyLocation },
        { provide: featurePathToken, useValue: featurePath },
      ],
    });
    locationStub = TestBed.inject(Location) as SpyLocation;
    service = TestBed.inject(SpectacularFeatureLocation);
  });

  let locationStub: SpyLocation;
  let service: SpectacularFeatureLocation;

  it('strips the feature path prefix from the location when navigated to a secondary route', () => {
    const listingPath = 'listing';
    setInitialFeatureRoute(listingPath);

    const actualPath = service.path();

    expect(actualPath).toBe(listingPath);
  });

  it(`doesn't touch the location path when navigated to the root route`, () => {
    const rootPath = '/';
    locationStub.setInitialPath(rootPath);

    const actualPath = service.path();

    expect(actualPath).toBe(rootPath);
  });
});
