import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { Component, Injectable, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ExtraOptions, Router, ROUTER_CONFIGURATION, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SpectacularAppComponent } from '../../application-testing/app-component/spectacular-app.component';
import { featurePathToken } from '../configuration/feature-path.token';
import { SpectacularFeatureTestbed } from './spectacular-feature-testbed';

@Component({
  template: '',
})
class HeroesJobBoardComponent {}

@Component({
  template: '',
})
class HeroesJobListingComponent {}

const jobListingPath = 'listing';

@NgModule({
  declarations: [HeroesJobBoardComponent, HeroesJobListingComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: HeroesJobBoardComponent,
      },
      {
        path: jobListingPath,
        component: HeroesJobListingComponent,
      },
    ]),
  ],
})
class HeroesJobBoardModule {}

const featurePath = 'heroes-job-board';

describe(SpectacularFeatureTestbed.name, () => {
  describe('Configuration', () => {
    @Injectable()
    class JobService {}

    @NgModule({
      providers: [JobService],
    })
    class JobServiceModule {}

    it('adds the specified imports', () => {
      SpectacularFeatureTestbed.createFeature({
        featurePath,
        featureModule: HeroesJobBoardModule,
        imports: [JobServiceModule],
      });

      const jobService = TestBed.inject(JobService);
      expect(jobService).toBeInstanceOf(JobService);
    });

    it('adds the specified providers', () => {
      SpectacularFeatureTestbed.createFeature({
        featurePath,
        featureModule: HeroesJobBoardModule,
        providers: [JobService],
      });

      const jobService = TestBed.inject(JobService);
      expect(jobService).toBeInstanceOf(JobService);
    });
  });

  describe('Routing', () => {
    it(`imports the ${RouterTestingModule.name}`, () => {
      SpectacularFeatureTestbed.createFeature({
        featurePath,
        featureModule: HeroesJobBoardModule,
      });

      const location = TestBed.inject(Location);
      expect(location).toBeInstanceOf(SpyLocation);
    });

    it('provides the specified feature path', () => {
      SpectacularFeatureTestbed.createFeature({
        featurePath,
        featureModule: HeroesJobBoardModule,
      });

      const actualFeaturePath = TestBed.inject(featurePathToken);
      expect(actualFeaturePath).toBe(featurePath);
    });

    it(`bootstraps ${SpectacularAppComponent.name}`, () => {
      const {
        componentInstance: rootComponent,
      } = SpectacularFeatureTestbed.createFeature({
        featurePath,
        featureModule: HeroesJobBoardModule,
      });

      expect(rootComponent).toBeInstanceOf(SpectacularAppComponent);
    });

    it('navigates to the default feature route', async () => {
      const rootFixture = SpectacularFeatureTestbed.createFeature({
        featurePath,
        featureModule: HeroesJobBoardModule,
      });
      const rootComponent = rootFixture.componentInstance;
      rootFixture.detectChanges();

      expect(rootComponent.getActiveComponent()).toBeInstanceOf(
        HeroesJobBoardComponent
      );
    });

    it('registers the default route of the specified feature module', async () => {
      const rootFixture = SpectacularFeatureTestbed.createFeature({
        featurePath,
        featureModule: HeroesJobBoardModule,
      });
      const rootComponent = rootFixture.componentInstance;
      const router = TestBed.inject(Router);

      await rootFixture.ngZone?.run(() => router.navigate([featurePath]));
      rootFixture.detectChanges();

      expect(rootComponent.getActiveComponent()).toBeInstanceOf(
        HeroesJobBoardComponent
      );
    });

    it('registers secondary routes of the specified feature module', async () => {
      const rootFixture = SpectacularFeatureTestbed.createFeature({
        featurePath,
        featureModule: HeroesJobBoardModule,
      });
      const rootComponent = rootFixture.componentInstance;
      const router = TestBed.inject(Router);

      await rootFixture.ngZone?.run(() =>
        router.navigate([featurePath, jobListingPath])
      );
      rootFixture.detectChanges();

      expect(rootComponent.getActiveComponent()).toBeInstanceOf(
        HeroesJobListingComponent
      );
    });

    it('forwards the specified router options', () => {
      const expectedRouterOptions: ExtraOptions = {
        useHash: true,
      };
      SpectacularFeatureTestbed.createFeature({
        featurePath,
        featureModule: HeroesJobBoardModule,
        routerOptions: expectedRouterOptions,
      });

      const actualRouterOptions = TestBed.inject(ROUTER_CONFIGURATION);

      expect(actualRouterOptions).toEqual(expectedRouterOptions);
    });
  });
});
