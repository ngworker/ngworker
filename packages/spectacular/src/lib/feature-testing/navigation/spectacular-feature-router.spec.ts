import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { NavigationExtras } from '@angular/router';
import { Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideSpectacularFeatureTest } from '../configuration/provide-spectacular-feature-test';
import { SpectacularFeatureRouter } from './spectacular-feature-router';

describe(SpectacularFeatureRouter.name, () => {
  const featurePath = 'crisis-center';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        provideSpectacularFeatureTest({
          featurePath,
        }),
      ],
    });
    const angularRouter = TestBed.inject(Router);
    navigateSpy = jest.spyOn(angularRouter, 'navigate').mockResolvedValue(true);
    navigateByUrlSpy = jest
      .spyOn(angularRouter, 'navigateByUrl')
      .mockResolvedValue(true);
    service = TestBed.inject(SpectacularFeatureRouter);
  });

  let navigateSpy: jest.SpyInstance<
    Promise<boolean>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [commands: any[], extras?: NavigationExtras | undefined]
  >;
  let navigateByUrlSpy: jest.SpyInstance<
    Promise<boolean>,
    [url: string | UrlTree, extras?: NavigationExtras | undefined]
  >;
  let service: SpectacularFeatureRouter;

  describe('navigate', () => {
    const crisesPath = 'crises';

    it('prepends the feature path and navigates', async () => {
      await service.navigate(['~', crisesPath]);

      expect(navigateSpy).toHaveBeenCalledTimes(1);
      const noNavigationOptions = undefined;
      expect(navigateSpy).toHaveBeenCalledWith(
        [featurePath, crisesPath],
        noNavigationOptions
      );
    });

    it('forwards navigation options', async () => {
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
      await service.navigateByUrl(`~/${dashboardPath}`);

      expect(navigateByUrlSpy).toHaveBeenCalledTimes(1);
      const noNavigationOptions = undefined;
      expect(navigateByUrlSpy).toHaveBeenCalledWith(
        `/${featurePath}/${dashboardPath}`,
        noNavigationOptions
      );
    });

    it('forwards navigation options', async () => {
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
      const ngZone = TestBed.inject(NgZone);
      const ngZoneRunSpy = jest.spyOn(ngZone, 'run');
      expect(ngZoneRunSpy).not.toHaveBeenCalled();

      await service.navigateByUrl(dashboardPath);

      expect(ngZoneRunSpy).toHaveBeenCalled();
    });

    it(`supports ${UrlTree.name}`, async () => {
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
