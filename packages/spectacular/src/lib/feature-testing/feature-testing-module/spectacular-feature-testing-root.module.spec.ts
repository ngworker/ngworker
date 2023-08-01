import { provideLocationMocks } from '@angular/common/testing';
import { Component, NgModule, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';
import { SpectacularFeatureTestingRootModule } from './spectacular-feature-testing-root.module';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
class TestRootComponent {
  @ViewChild(RouterOutlet)
  routerOutlet?: RouterOutlet;

  getActiveComponent<TActiveComponent>(): TActiveComponent {
    if (!this.routerOutlet) {
      throw new Error(
        'TestRootComponent#getActiveComponent called before its view child is available.'
      );
    }

    return this.routerOutlet.component as TActiveComponent;
  }
}

describe(SpectacularFeatureTestingRootModule.name, () => {
  describe('Routing', () => {
    it(`makes ${SpectacularAppComponent.name} routable`, async () => {
      const path = 'spectacular';
      TestBed.configureTestingModule({
        imports: [SpectacularFeatureTestingRootModule],
        providers: [
          provideRouter([{ path, component: SpectacularAppComponent }]),
          provideLocationMocks(),
        ],
      }).compileComponents();
      const rootFixture = TestBed.createComponent(TestRootComponent);
      const router = TestBed.inject(Router);

      await rootFixture.ngZone?.run(() => router.navigate([path]));
      rootFixture.detectChanges();

      const activeComponent =
        rootFixture.componentInstance.getActiveComponent();
      expect(activeComponent).toBeInstanceOf(SpectacularAppComponent);
    });
  });

  describe('Dependency injection', () => {
    it('guards against being registered in multiple injectors', () => {
      @NgModule({
        imports: [SpectacularFeatureTestingRootModule],
      })
      class TestChildModule {}

      expect.assertions(1);
      TestBed.configureTestingModule({
        imports: [
          SpectacularFeatureTestingRootModule,
          RouterTestingModule.withRoutes([
            { path: 'child', loadChildren: () => TestChildModule },
          ]),
        ],
      });
      const router = TestBed.inject(Router);

      const act = () => router.navigateByUrl('/child');

      expect(act).rejects.toThrowError(/multiple injectors/);
    });

    it('does not guard the first injector that registers it', () => {
      TestBed.configureTestingModule({
        imports: [SpectacularFeatureTestingRootModule],
      });

      const act = () => TestBed.inject(SpectacularFeatureTestingRootModule);

      expect(act).not.toThrow();
    });
  });
});
