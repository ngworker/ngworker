import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { NavigationExtras } from '@angular/router';
import { Router, UrlTree } from '@angular/router';
import { provideSpectacularFeatureTesting } from '../configuration/provide-spectacular-feature-testing';
import { SpectacularFeatureRouter } from './spectacular-feature-router';

function setup() {
  const featurePath = 'crisis-center';

  TestBed.configureTestingModule({
    providers: [
      provideSpectacularFeatureTesting({
        featurePath,
        routes: [],
      }),
    ],
  });

  const angularRouter = TestBed.inject(Router);
  const navigateSpy = jest
    .spyOn(angularRouter, 'navigate')
    .mockResolvedValue(true);
  const navigateByUrlSpy = jest
    .spyOn(angularRouter, 'navigateByUrl')
    .mockResolvedValue(true);
  const service = TestBed.inject(SpectacularFeatureRouter);

  return {
    angularRouter,
    featurePath,
    navigateSpy,
    navigateByUrlSpy,
    service,
  };
}

describe(SpectacularFeatureRouter.name, () => {
  describe('navigate', () => {
    const crisesPath = 'crises';

    it('prepends the feature path and navigates', async () => {
      const { featurePath, service, navigateSpy } = setup();

      await service.navigate(['~', crisesPath]);

      expect(navigateSpy).toHaveBeenCalledTimes(1);
      const noNavigationOptions = undefined;
      expect(navigateSpy).toHaveBeenCalledWith(
        [featurePath, crisesPath],
        noNavigationOptions
      );
    });

    it('forwards navigation options', async () => {
      const { featurePath, service, navigateSpy } = setup();
      const navigationOptions: NavigationExtras = {
        preserveFragment: true,
      };

      await service.navigate(['~', crisesPath], navigationOptions);
      expect(navigateSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenCalledWith(
        [featurePath, crisesPath],
        navigationOptions
      );
    });

    it('runs navigation in the NgZone', async () => {
      const { service } = setup();
      const ngZone = TestBed.inject(NgZone);
      const ngZoneRunSpy = jest.spyOn(ngZone, 'run');
      expect(ngZoneRunSpy).not.toHaveBeenCalled();

      await service.navigate(['~', crisesPath]);

      expect(ngZoneRunSpy).toHaveBeenCalled();
    });
  });

  describe('navigateByUrl', () => {
    const dashboardPath = 'dashboard';

    it('prepends the feature path to the URL and navigates', async () => {
      const { featurePath, service, navigateByUrlSpy } = setup();

      await service.navigateByUrl(`~/${dashboardPath}`);

      expect(navigateByUrlSpy).toHaveBeenCalledTimes(1);
      const noNavigationOptions = undefined;
      expect(navigateByUrlSpy).toHaveBeenCalledWith(
        `/${featurePath}/${dashboardPath}`,
        noNavigationOptions
      );
    });

    it('forwards navigation options', async () => {
      const { featurePath, service, navigateByUrlSpy } = setup();
      const navigationOptions: NavigationExtras = {
        preserveFragment: true,
      };

      await service.navigateByUrl(`~/${dashboardPath}`, navigationOptions);
      expect(navigateByUrlSpy).toHaveBeenCalledTimes(1);
      expect(navigateByUrlSpy).toHaveBeenCalledWith(
        `/${featurePath}/${dashboardPath}`,
        navigationOptions
      );
    });

    it('runs navigation in the NgZone', async () => {
      const { service } = setup();
      const ngZone = TestBed.inject(NgZone);
      const ngZoneRunSpy = jest.spyOn(ngZone, 'run');
      expect(ngZoneRunSpy).not.toHaveBeenCalled();

      await service.navigateByUrl(dashboardPath);

      expect(ngZoneRunSpy).toHaveBeenCalled();
    });

    it(`supports ${UrlTree.name}`, async () => {
      const { featurePath, navigateByUrlSpy, service } = setup();
      const angularRouter = TestBed.inject(Router);
      const dashboardUrlTree = angularRouter.createUrlTree([
        '~',
        dashboardPath,
      ]);

      await service.navigateByUrl(dashboardUrlTree);

      expect(navigateByUrlSpy).toHaveBeenCalledTimes(1);
      const noNavigationOptions = undefined;
      expect(navigateByUrlSpy).toHaveBeenCalledWith(
        `/${featurePath}/${dashboardPath}`,
        noNavigationOptions
      );
    });
  });
});
