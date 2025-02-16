import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { Component, Injectable, NgModule } from '@angular/core';
import type { ExtraOptions, Routes } from '@angular/router';
import { ROUTER_CONFIGURATION } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';
import { featurePathToken } from '../configuration/feature-path.token';
import { createFeatureHarness } from './create-feature-harness';

@Component({
  standalone: true,
  selector: 'spectacular-test-heroes-job-board',
  imports: [],
  template: '',
})
class HeroesJobBoardComponent {}

@Component({
  standalone: true,
  selector: 'spectacular-test-heroes-job-listing',
  imports: [],
  template: '',
})
class HeroesJobListingComponent {}

const jobListingPath = 'listing';

const heroesJobBoardRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HeroesJobBoardComponent,
  },
  {
    path: jobListingPath,
    component: HeroesJobListingComponent,
  },
];

const featurePath = 'heroes-job-board';

describe(createFeatureHarness.name, () => {
  describe('Configuration', () => {
    @Injectable()
    class JobService {}

    @NgModule({
      providers: [JobService],
    })
    class JobServiceModule {}

    it('adds the specified imports', () => {
      const harness = createFeatureHarness({
        featurePath,
        imports: [JobServiceModule],
        routes: [
          { path: featurePath, loadChildren: () => heroesJobBoardRoutes },
        ],
      });

      const jobService = harness.inject(JobService);
      expect(jobService).toBeInstanceOf(JobService);
    });

    it('adds the specified providers', () => {
      const harness = createFeatureHarness({
        featurePath,
        providers: [JobService],
        routes: [
          { path: featurePath, loadChildren: () => heroesJobBoardRoutes },
        ],
      });

      const jobService = harness.inject(JobService);
      expect(jobService).toBeInstanceOf(JobService);
    });
  });

  describe('Routing', () => {
    it(`imports the ${RouterTestingModule.name}`, () => {
      const harness = createFeatureHarness({
        featurePath,
        routes: [
          { path: featurePath, loadChildren: () => heroesJobBoardRoutes },
        ],
      });

      const location = harness.inject(Location);
      expect(location).toBeInstanceOf(SpyLocation);
    });

    it('provides the specified feature path', () => {
      const harness = createFeatureHarness({
        featurePath,
        routes: [
          { path: featurePath, loadChildren: () => heroesJobBoardRoutes },
        ],
      });

      const actualFeaturePath = harness.inject(featurePathToken);
      expect(actualFeaturePath).toBe(featurePath);
    });

    it(`bootstraps ${SpectacularAppComponent.name}`, () => {
      const harness = createFeatureHarness({
        featurePath,
        routes: [
          { path: featurePath, loadChildren: () => heroesJobBoardRoutes },
        ],
      });

      expect(harness.rootComponent).toBeInstanceOf(SpectacularAppComponent);
    });

    it('navigates to the default feature route', async () => {
      const harness = createFeatureHarness({
        featurePath,
        routes: [
          { path: featurePath, loadChildren: () => heroesJobBoardRoutes },
        ],
      });

      expect(harness.rootComponent.getActiveComponent()).toBeInstanceOf(
        HeroesJobBoardComponent
      );
    });

    it('registers the default route of the specified feature module', async () => {
      const harness = createFeatureHarness({
        featurePath,
        routes: [
          { path: featurePath, loadChildren: () => heroesJobBoardRoutes },
        ],
      });

      await harness.router.navigate([featurePath]);

      expect(harness.rootComponent.getActiveComponent()).toBeInstanceOf(
        HeroesJobBoardComponent
      );
    });

    it('registers deep routes of the specified feature module', async () => {
      const harness = createFeatureHarness({
        featurePath,
        routes: [
          { path: featurePath, loadChildren: () => heroesJobBoardRoutes },
        ],
      });

      await harness.router.navigate([featurePath, jobListingPath]);

      expect(harness.rootComponent.getActiveComponent()).toBeInstanceOf(
        HeroesJobListingComponent
      );
    });

    it('forwards the specified router options', () => {
      const expectedRouterOptions: ExtraOptions = {
        useHash: true,
      };
      const harness = createFeatureHarness({
        featurePath,
        routes: [
          { path: featurePath, loadChildren: () => heroesJobBoardRoutes },
        ],
        routerOptions: expectedRouterOptions,
      });

      const actualRouterOptions = harness.inject(ROUTER_CONFIGURATION);

      expect(actualRouterOptions).toEqual(expectedRouterOptions);
    });
  });
});
