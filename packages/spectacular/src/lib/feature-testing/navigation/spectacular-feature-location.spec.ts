import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';

import { featurePathToken } from '../configuration/feature-path.token';
import { SpectacularFeatureLocation } from './spectacular-feature-location';

const featurePath = 'villains-job-board';

describe(SpectacularFeatureLocation.name, () => {
  describe('URLs', () => {
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

    describe('Routes in the feature under test', () => {
      it('returns tildes slash (~/) when navigated to the feature route with an empty path', () => {
        const homePath = '';
        setInitialFeatureRoute(homePath);

        const actualPath = service.path();

        expect(actualPath).toBe(`~/`);
      });

      it('prepends the feature path with a tilde (~) when navigated to a 1-layer feature route', () => {
        const listingPath = 'listing';
        setInitialFeatureRoute(listingPath);

        const actualPath = service.path();

        expect(actualPath).toBe(`~/${listingPath}`);
      });

      it('prepends the feature path with a tilde (~) when navigated to a 2-layer feature route', () => {
        const contactPath = 'listing/contact';
        setInitialFeatureRoute(contactPath);

        const actualPath = service.path();

        expect(actualPath).toBe(`~/${contactPath}`);
      });
    });

    describe('Routes outside of the feature under test', () => {
      it(`doesn't touch the location path when navigated to the root route`, () => {
        const rootPath = '/';
        locationStub.setInitialPath(rootPath);

        const actualPath = service.path();

        expect(actualPath).toBe(rootPath);
      });

      it(`doesn't touch the location path when navigated to another feature`, () => {
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
        const includeHash = true;
        jest
          .spyOn(locationStub, 'path')
          .mockReturnValue('/' + featurePath + '/' + helpPath + '#' + fragment);

        const actualPath = service.path(includeHash);

        expect(actualPath).toBe(`~/${helpPath}#${fragment}`);
      });

      it('forwards control to Location.path (includeHash=false)', () => {
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
