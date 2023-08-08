import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideSpectacularFeatureTesting } from '../configuration/provide-spectacular-feature-testing';
import { SpectacularFeatureLocation } from './spectacular-feature-location';

function setup() {
  const setInitialFeatureRoute = (routePath: string): void => {
    const initialPath = `/${featurePath}/${routePath}`;

    locationStub.setInitialPath(initialPath);
  };

  const featurePath = 'villains-job-board';

  TestBed.configureTestingModule({
    providers: [
      { provide: Location, useClass: SpyLocation },
      provideSpectacularFeatureTesting({
        featurePath,
        routes: [],
      }),
    ],
  });

  const locationStub = TestBed.inject(Location) as SpyLocation;
  const service = TestBed.inject(SpectacularFeatureLocation);

  return {
    featurePath,
    locationStub,
    service,
    setInitialFeatureRoute,
  };
}

describe(SpectacularFeatureLocation.name, () => {
  describe('URLs', () => {
    describe('Routes in the feature under test', () => {
      it('returns tildes slash (~/) when navigated to the feature route with an empty path', () => {
        const { service, setInitialFeatureRoute } = setup();
        const homePath = '';
        setInitialFeatureRoute(homePath);

        const actualPath = service.path();

        expect(actualPath).toBe(`~/`);
      });

      it('prepends the feature path with a tilde (~) when navigated to a 1-layer feature route', () => {
        const { service, setInitialFeatureRoute } = setup();
        const listingPath = 'listing';
        setInitialFeatureRoute(listingPath);

        const actualPath = service.path();

        expect(actualPath).toBe(`~/${listingPath}`);
      });

      it('prepends the feature path with a tilde (~) when navigated to a 2-layer feature route', () => {
        const { service, setInitialFeatureRoute } = setup();
        const contactPath = 'listing/contact';
        setInitialFeatureRoute(contactPath);

        const actualPath = service.path();

        expect(actualPath).toBe(`~/${contactPath}`);
      });
    });

    describe('Routes outside of the feature under test', () => {
      it(`doesn't touch the location path when navigated to the root route`, () => {
        const { locationStub, service } = setup();
        const rootPath = '/';
        locationStub.setInitialPath(rootPath);

        const actualPath = service.path();

        expect(actualPath).toBe(rootPath);
      });

      it(`doesn't touch the location path when navigated to another feature`, () => {
        const { locationStub, service } = setup();
        const otherFeaturePath = '/heroes/1';
        locationStub.setInitialPath(otherFeaturePath);

        const actualPath = service.path();

        expect(actualPath).toBe(otherFeaturePath);
      });
    });

    describe('includeHash parameter', () => {
      const helpPath = 'help';
      const fragment = 'faq';

      it('forwards control to Location.path (includeHash=true)', () => {
        const { featurePath, locationStub, service } = setup();
        const includeHash = true;
        jest
          .spyOn(locationStub, 'path')
          .mockReturnValue('/' + featurePath + '/' + helpPath + '#' + fragment);

        const actualPath = service.path(includeHash);

        expect(actualPath).toBe(`~/${helpPath}#${fragment}`);
      });

      it('forwards control to Location.path (includeHash=false)', () => {
        const { featurePath, locationStub, service } = setup();
        const includeHash = false;
        jest
          .spyOn(locationStub, 'path')
          .mockReturnValue('/' + featurePath + '/' + helpPath);

        const actualPath = service.path(includeHash);

        expect(actualPath).toBe(`~/${helpPath}`);
      });
    });
  });
});
