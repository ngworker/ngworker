import {
  APP_BOOTSTRAP_LISTENER,
  APP_INITIALIZER,
  ComponentRef,
  ENVIRONMENT_INITIALIZER,
  FactoryProvider,
  Injectable,
  NgModule,
  PLATFORM_INITIALIZER,
} from '@angular/core';
import { ignoreDevelopmentModeLog } from '@internal/test-util';

import { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';
import { createApplicationHarness } from './create-application-harness';

let applicationInitialized = false;
let bootstrapped = false;
let environmentInitialized = false;
let platformInitialized = false;

const applicationInitializer: FactoryProvider = {
  multi: true,
  provide: APP_INITIALIZER,
  useFactory: () => (): void => {
    applicationInitialized = true;
  },
};
const asyncApplicationInitializer: FactoryProvider = {
  multi: true,
  provide: APP_INITIALIZER,
  useFactory: () => async (): Promise<void> => {
    await Promise.resolve();
    applicationInitialized = true;
  },
};
const bootstrapListener: FactoryProvider = {
  multi: true,
  provide: APP_BOOTSTRAP_LISTENER,
  useFactory:
    () =>
    (component: ComponentRef<SpectacularAppComponent>): void => {
      if (!(component.instance instanceof SpectacularAppComponent)) {
        throw new Error(
          'The bootstrapped component is not an instance of SpectacularAppComponent'
        );
      }

      bootstrapped = true;
    },
};
const environmentInitializer: FactoryProvider = {
  multi: true,
  provide: ENVIRONMENT_INITIALIZER,
  useFactory: () => (): void => {
    environmentInitialized = true;
  },
};
const asyncEnvironmentInitializer: FactoryProvider = {
  multi: true,
  provide: ENVIRONMENT_INITIALIZER,
  useFactory: () => async (): Promise<void> => {
    await Promise.resolve();
    environmentInitialized = true;
  },
};
const platformInitializer: FactoryProvider = {
  multi: true,
  provide: PLATFORM_INITIALIZER,
  useFactory: () => (): void => {
    platformInitialized = true;
  },
};
const asyncPlatformInitializer: FactoryProvider = {
  multi: true,
  provide: PLATFORM_INITIALIZER,
  useFactory: () => async (): Promise<void> => {
    await Promise.resolve();
    platformInitialized = true;
  },
};

@NgModule({
  providers: [applicationInitializer],
})
class ApplicationInitializerModule {}

@NgModule({
  providers: [asyncApplicationInitializer],
})
class AsyncApplicationInitializerModule {}

@NgModule({
  providers: [asyncEnvironmentInitializer],
})
class AsyncEnvironmentInitializerModule {}

@NgModule({
  providers: [asyncPlatformInitializer],
})
class AsyncPlatformInitializerModule {}

@NgModule({
  providers: [bootstrapListener],
})
class BootstrapListenerModule {}

@NgModule({
  providers: [environmentInitializer],
})
class EnvironmentInitializerModule {}

@NgModule({
  providers: [platformInitializer],
})
class PlatformInitializerModule {}

describe(createApplicationHarness.name, () => {
  beforeEach(() => {
    applicationInitialized = false;
    bootstrapped = false;
    environmentInitialized = false;
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

      expect(applicationInitialized).toBe(true);
    });

    it('registers and runs the specified asynchronous initializer', async () => {
      await createApplicationHarness({
        providers: [asyncApplicationInitializer],
      });

      expect(applicationInitialized).toBe(true);
    });

    it('registers the specified initializer Angular module', () => {
      createApplicationHarness({
        imports: [ApplicationInitializerModule],
      });

      expect(applicationInitialized).toBe(true);
    });

    it('registers the specified asynchronous initializer Angular module', async () => {
      await createApplicationHarness({
        imports: [AsyncApplicationInitializerModule],
      });

      expect(applicationInitialized).toBe(true);
    });
  });

  describe('Environment initializers', () => {
    it('registers and runs the specified initializer', () => {
      createApplicationHarness({
        providers: [environmentInitializer],
      });

      expect(environmentInitialized).toBe(true);
    });

    it('registers and runs the specified asynchronous initializer', async () => {
      await createApplicationHarness({
        providers: [asyncEnvironmentInitializer],
      });

      expect(environmentInitialized).toBe(true);
    });

    it('registers the specified initializer Angular module', () => {
      createApplicationHarness({
        imports: [EnvironmentInitializerModule],
      });

      expect(environmentInitialized).toBe(true);
    });

    it('registers the specified asynchronous initializer Angular module', async () => {
      await createApplicationHarness({
        imports: [AsyncEnvironmentInitializerModule],
      });

      expect(environmentInitialized).toBe(true);
    });
  });

  describe('Platform initializers', () => {
    it('registers and runs the specified initializer', () => {
      createApplicationHarness({
        providers: [platformInitializer],
      });

      expect(platformInitialized).toBe(true);
    });

    it('registers and runs the specified asynchronous initializer', async () => {
      await createApplicationHarness({
        providers: [asyncPlatformInitializer],
      });

      expect(platformInitialized).toBe(true);
    });

    it('registers the specified initializer Angular module', () => {
      createApplicationHarness({
        imports: [PlatformInitializerModule],
      });

      expect(platformInitialized).toBe(true);
    });

    it('registers the specified asynchronous initializer Angular module', async () => {
      await createApplicationHarness({
        imports: [AsyncPlatformInitializerModule],
      });

      expect(platformInitialized).toBe(true);
    });
  });

  describe('All application hooks', () => {
    it('registers and runs the specified initializer and bootstrap listener', async () => {
      await createApplicationHarness({
        providers: [applicationInitializer, bootstrapListener],
      });

      expect(applicationInitialized).toBe(true);
      expect(bootstrapped).toBe(true);
    });

    it('registers the specified initializer and bootstrap Angular modules', async () => {
      await createApplicationHarness({
        imports: [ApplicationInitializerModule, BootstrapListenerModule],
      });

      expect(applicationInitialized).toBe(true);
      expect(bootstrapped).toBe(true);
    });

    it('registers and runs the specified asynchronous initializer and bootstrap listener', async () => {
      await createApplicationHarness({
        providers: [asyncApplicationInitializer, bootstrapListener],
      });

      expect(applicationInitialized).toBe(true);
      expect(bootstrapped).toBe(true);
    });

    it('registers the specified asynchronous initializer and bootstrap listener Angular modules', async () => {
      await createApplicationHarness({
        imports: [AsyncApplicationInitializerModule, BootstrapListenerModule],
      });

      expect(applicationInitialized).toBe(true);
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
