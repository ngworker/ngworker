import { Component, NgModule, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SpectacularAppComponent } from '../../application-testing/app-component/spectacular-app.component';
import { SpectacularFeatureTestingRootModule } from './spectacular-feature-testing-root.module';

@Component({
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

@NgModule({
  declarations: [TestRootComponent],
  imports: [RouterModule],
})
class TestRootModule {}

const optionalAngularDependency = null;

describe(SpectacularFeatureTestingRootModule.name, () => {
  describe('Declarables', () => {
    it(`makes ${SpectacularAppComponent.name} routable`, async () => {
      const path = 'spectacular';
      TestBed.configureTestingModule({
        imports: [
          SpectacularFeatureTestingRootModule,
          RouterTestingModule.withRoutes([
            { path, component: SpectacularAppComponent },
          ]),
          TestRootModule,
        ],
      }).compileComponents();
      const rootFixture = TestBed.createComponent(TestRootComponent);
      const router = TestBed.inject(Router);

      await rootFixture.ngZone?.run(() => router.navigate([path]));
      rootFixture.detectChanges();

      const activeComponent = rootFixture.componentInstance.getActiveComponent();
      expect(activeComponent).toBeInstanceOf(SpectacularAppComponent);
    });
  });

  describe('Dependency injection', () => {});
  it('guards against being registered in multiple injectors', () => {
    const rootInjectorInstance = new SpectacularFeatureTestingRootModule(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      optionalAngularDependency as any
    );

    expect(
      () => new SpectacularFeatureTestingRootModule(rootInjectorInstance)
    ).toThrowError(/multiple injectors/);
  });

  it('does not guard the first injector that registers it', () => {
    expect(
      () =>
        new SpectacularFeatureTestingRootModule(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          optionalAngularDependency as any
        )
    ).not.toThrow();
  });
});
