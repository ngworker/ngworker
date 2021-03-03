import {
  APP_BOOTSTRAP_LISTENER,
  APP_INITIALIZER,
  ComponentRef,
  FactoryProvider,
  Injectable,
  NgModule,
} from '@angular/core';
import { ignoreDevelopmentModeLog } from '@internal/test-util';

import { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';
import { createApplicationHarness } from './create-application-harness';

let bootstrapped = false;
let initialized = false;

const applicationInitializer: FactoryProvider = {
  multi: true,
  provide: APP_INITIALIZER,
  useFactory: () => (): void => {
    initialized = true;
  },
};
const asyncApplicationInitializer: FactoryProvider = {
  multi: true,
  provide: APP_INITIALIZER,
  useFactory: () => async (): Promise<void> => {
    await Promise.resolve();
    initialized = true;
  },
};
const bootstrapListener: FactoryProvider = {
  multi: true,
  provide: APP_BOOTSTRAP_LISTENER,
  useFactory: () => (
    component: ComponentRef<SpectacularAppComponent>
  ): void => {
    if (!(component.instance instanceof SpectacularAppComponent)) {
      throw new Error(
        'The bootstrapped component is not an instance of SpectacularAppComponent'
      );
    }

    bootstrapped = true;
  },
};

@NgModule({
  providers: [asyncApplicationInitializer],
})
class AsyncApplicationInitializerModule {}

@NgModule({
  providers: [bootstrapListener],
})
class BootstrapListenerModule {}

@NgModule({
  providers: [applicationInitializer],
})
class InitializerModule {}

describe(createApplicationHarness.name, () => {
  beforeEach(() => {
    bootstrapped = false;
    initialized = false;
    ignoreDevelopmentModeLog();
  });

  describe('Bootstrap listeners', () => {
    it('registers and runs the specified bootstrap listener', async () => {
      await createApplicationHarness({
        providers: [bootstrapListener],
      });

      expect(bootstrapped).toBe(true);
    });

    it('registers the specified bootstrap listener Angular module', async () => {
      await createApplicationHarness({
        imports: [BootstrapListenerModule],
      });

      expect(bootstrapped).toBe(true);
    });
  });

  describe('Application initializers', () => {
    it('registers and runs the specified initializer', () => {
      createApplicationHarness({
        providers: [applicationInitializer],
      });

      expect(initialized).toBe(true);
    });

    it('registers and runs the specified asynchronous initializer', async () => {
      await createApplicationHarness({
        providers: [asyncApplicationInitializer],
      });

      expect(initialized).toBe(true);
    });

    it('registers the specified initializer Angular module', () => {
      createApplicationHarness({
        imports: [InitializerModule],
      });

      expect(initialized).toBe(true);
    });

    it('registers the specified asynchronous initializer Angular module', async () => {
      await createApplicationHarness({
        imports: [AsyncApplicationInitializerModule],
      });

      expect(initialized).toBe(true);
    });
  });

  describe('All application hooks', () => {
    it('registers and runs the specified initializer and bootstrap listener', async () => {
      await createApplicationHarness({
        providers: [applicationInitializer, bootstrapListener],
      });

      expect(initialized).toBe(true);
      expect(bootstrapped).toBe(true);
    });

    it('registers the specified initializer and bootstrap Angular modules', async () => {
      await createApplicationHarness({
        imports: [InitializerModule, BootstrapListenerModule],
      });

      expect(initialized).toBe(true);
      expect(bootstrapped).toBe(true);
    });

    it('registers and runs the specified asynchronous initializer and bootstrap listener', async () => {
      await createApplicationHarness({
        providers: [asyncApplicationInitializer, bootstrapListener],
      });

      expect(initialized).toBe(true);
      expect(bootstrapped).toBe(true);
    });

    it('registers the specified asynchronous initializer and bootstrap listener Angular modules', async () => {
      await createApplicationHarness({
        imports: [AsyncApplicationInitializerModule, BootstrapListenerModule],
      });

      expect(initialized).toBe(true);
      expect(bootstrapped).toBe(true);
    });
  });

  describe('Configuration', () => {
    @Injectable()
    class AdminService {}

    @NgModule({
      providers: [AdminService],
    })
    class AdminServiceModule {}

    it('adds the specified imports', async () => {
      const harness = await createApplicationHarness({
        imports: [AdminServiceModule],
      });

      const jobService = harness.inject(AdminService);
      expect(jobService).toBeInstanceOf(AdminService);
    });

    it('adds the specified providers', async () => {
      const harness = await createApplicationHarness({
        providers: [AdminService],
      });

      const jobService = harness.inject(AdminService);
      expect(jobService).toBeInstanceOf(AdminService);
    });
  });

  describe('Bootstrapping', () => {
    it(`bootstraps ${SpectacularAppComponent.name} without application hooks`, async () => {
      const harness = await createApplicationHarness();

      expect(harness.rootComponent).toBeInstanceOf(SpectacularAppComponent);
    });

    it(`bootstraps ${SpectacularAppComponent.name} with an async initializer`, async () => {
      const harness = await createApplicationHarness({
        providers: [asyncApplicationInitializer],
      });

      expect(harness.rootComponent).toBeInstanceOf(SpectacularAppComponent);
    });

    it(`bootstraps ${SpectacularAppComponent.name} with a bootstrap listener`, async () => {
      const harness = await createApplicationHarness({
        providers: [bootstrapListener],
      });

      expect(harness.rootComponent).toBeInstanceOf(SpectacularAppComponent);
    });
  });
});
