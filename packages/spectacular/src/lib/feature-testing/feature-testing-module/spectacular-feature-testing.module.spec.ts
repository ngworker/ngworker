import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SpectacularAppComponent } from '../../application-testing/app-component/spectacular-app.component';
import { featurePathToken } from '../configuration/feature-path.token';
import { SpectacularFeatureTestingModule } from './spectacular-feature-testing.module';

@Component({
  template: '',
})
class TestPageComponent {}

@NgModule({
  declarations: [TestPageComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TestPageComponent,
      },
    ]),
  ],
})
class TestFeatureModule {}

describe(SpectacularFeatureTestingModule.name, () => {
  describe('Dependency injection', () => {
    it(`cannot be imported without using the ${SpectacularFeatureTestingModule.withFeature.name} method`, () => {
      let ngModule: SpectacularFeatureTestingModule | undefined;

      TestBed.configureTestingModule({
        imports: [SpectacularFeatureTestingModule],
      });

      expect(() => {
        ngModule = TestBed.inject(SpectacularFeatureTestingModule);
      }).toThrow();
      expect(ngModule).toBeUndefined();
    });
  });

  describe('Routing', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SpectacularFeatureTestingModule.withFeature({
            featureModule: TestFeatureModule,
            featurePath,
          }),
        ],
      }).compileComponents();

      rootFixture = TestBed.createComponent(SpectacularAppComponent);
      rootComponent = rootFixture.componentInstance;
    });

    const featurePath = 'test-feature';
    let rootComponent: SpectacularAppComponent;
    let rootFixture: ComponentFixture<SpectacularAppComponent>;

    it(`imports the ${RouterTestingModule.name}`, () => {
      const location = TestBed.inject(Location);
      expect(location).toBeInstanceOf(SpyLocation);
    });

    it('provides the specified feature path', () => {
      const actualFeaturePath = TestBed.inject(featurePathToken);
      expect(actualFeaturePath).toBe(featurePath);
    });

    it(`makes ${SpectacularAppComponent.name} routable`, () => {
      expect(rootComponent).toBeInstanceOf(SpectacularAppComponent);
    });

    it('registers the routes of the specified feature module', async () => {
      const router = TestBed.inject(Router);

      await rootFixture.ngZone?.run(() => router.navigate([featurePath]));
      rootFixture.detectChanges();

      expect(rootComponent.getActiveComponent()).toBeInstanceOf(
        TestPageComponent
      );
    });
  });
});
