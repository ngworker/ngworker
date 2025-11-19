import { Location, LocationStrategy, PlatformLocation } from '@angular/common';
import {
  MockLocationStrategy,
  MockPlatformLocation,
  SpyLocation,
  provideLocationMocks,
} from '@angular/common/testing';
import {
  APP_BOOTSTRAP_LISTENER,
  APP_INITIALIZER,
  ComponentRef,
  ENVIRONMENT_INITIALIZER,
  FactoryProvider,
  inject,
  Injectable,
  InjectionToken,
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
          'The bootstrapped component is not an instance of SpectacularAppComponent',
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

  describe('Routing', () => {
    it(`leaves the default test provider for ${PlatformLocation.name} as-is`, async () => {
      const harness = await createApplicationHarness();

      const platformLocation = harness.inject(PlatformLocation);
      expect(platformLocation).toBeInstanceOf(MockPlatformLocation);
    });

    it(`supports ${provideLocationMocks.name}`, async () => {
      const harness = await createApplicationHarness({
        providers: [provideLocationMocks()],
      });

      const location = harness.inject(Location);
      expect(location).toBeInstanceOf(SpyLocation);
      const locationStrategy = harness.inject(LocationStrategy);
      expect(locationStrategy).toBeInstanceOf(MockLocationStrategy);
    });
  });

  describe('Using inject() in provider factories', () => {
    const TEST_TOKEN = new InjectionToken<string>('TEST_TOKEN');
    
    it('supports inject() in APP_INITIALIZER factory', async () => {
      let capturedValue = '';
      
      await createApplicationHarness({
        providers: [
          { provide: TEST_TOKEN, useValue: 'app-initializer-value' },
          {
            provide: APP_INITIALIZER,
            useFactory: () => {
              const value = inject(TEST_TOKEN);
              return () => {
                capturedValue = value;
              };
            },
            multi: true,
          },
        ],
      });
      
      expect(capturedValue).toBe('app-initializer-value');
    });

    it('supports inject() in APP_BOOTSTRAP_LISTENER factory', async () => {
      let capturedValue = '';
      
      await createApplicationHarness({
        providers: [
          { provide: TEST_TOKEN, useValue: 'bootstrap-listener-value' },
          {
            provide: APP_BOOTSTRAP_LISTENER,
            useFactory: () => {
              const value = inject(TEST_TOKEN);
              return () => {
                capturedValue = value;
              };
            },
            multi: true,
          },
        ],
      });
      
      expect(capturedValue).toBe('bootstrap-listener-value');
    });

    it('supports inject() in ENVIRONMENT_INITIALIZER factory', async () => {
      let capturedValue = '';
      
      await createApplicationHarness({
        providers: [
          { provide: TEST_TOKEN, useValue: 'environment-initializer-value' },
          {
            provide: ENVIRONMENT_INITIALIZER,
            useFactory: () => {
              const value = inject(TEST_TOKEN);
              return () => {
                capturedValue = value;
              };
            },
            multi: true,
          },
        ],
      });
      
      expect(capturedValue).toBe('environment-initializer-value');
    });

    it('supports inject() in PLATFORM_INITIALIZER factory', async () => {
      let capturedValue = '';
      
      await createApplicationHarness({
        providers: [
          { provide: TEST_TOKEN, useValue: 'platform-initializer-value' },
          {
            provide: PLATFORM_INITIALIZER,
            useFactory: () => {
              const value = inject(TEST_TOKEN);
              return () => {
                capturedValue = value;
              };
            },
            multi: true,
          },
        ],
      });
      
      expect(capturedValue).toBe('platform-initializer-value');
    });

    it('supports inject() in async APP_INITIALIZER factory', async () => {
      let capturedValue = '';
      
      await createApplicationHarness({
        providers: [
          { provide: TEST_TOKEN, useValue: 'async-app-initializer-value' },
          {
            provide: APP_INITIALIZER,
            useFactory: () => {
              const value = inject(TEST_TOKEN);
              return async () => {
                await Promise.resolve();
                capturedValue = value;
              };
            },
            multi: true,
          },
        ],
      });
      
      expect(capturedValue).toBe('async-app-initializer-value');
    });

    it('supports inject() with multiple dependencies in factory', async () => {
      const TOKEN_A = new InjectionToken<string>('TOKEN_A');
      const TOKEN_B = new InjectionToken<number>('TOKEN_B');
      let capturedA = '';
      let capturedB = 0;
      
      await createApplicationHarness({
        providers: [
          { provide: TOKEN_A, useValue: 'value-a' },
          { provide: TOKEN_B, useValue: 42 },
          {
            provide: APP_INITIALIZER,
            useFactory: () => {
              const valueA = inject(TOKEN_A);
              const valueB = inject(TOKEN_B);
              return () => {
                capturedA = valueA;
                capturedB = valueB;
              };
            },
            multi: true,
          },
        ],
      });
      
      expect(capturedA).toBe('value-a');
      expect(capturedB).toBe(42);
    });
  });

  describe('Using inject() in initializer callbacks', () => {
    const TEST_TOKEN = new InjectionToken<string>('TEST_TOKEN');
    
    it('supports inject() inside APP_INITIALIZER callback', async () => {
      let capturedValue = '';
      
      await createApplicationHarness({
        providers: [
          { provide: TEST_TOKEN, useValue: 'callback-value' },
          {
            provide: APP_INITIALIZER,
            useFactory: () => {
              return () => {
                capturedValue = inject(TEST_TOKEN);
              };
            },
            multi: true,
          },
        ],
      });
      
      expect(capturedValue).toBe('callback-value');
    });

    it('supports inject() inside APP_BOOTSTRAP_LISTENER callback', async () => {
      let capturedValue = '';
      
      await createApplicationHarness({
        providers: [
          { provide: TEST_TOKEN, useValue: 'bootstrap-callback-value' },
          {
            provide: APP_BOOTSTRAP_LISTENER,
            useFactory: () => {
              return () => {
                capturedValue = inject(TEST_TOKEN);
              };
            },
            multi: true,
          },
        ],
      });
      
      expect(capturedValue).toBe('bootstrap-callback-value');
    });

    it('supports inject() inside ENVIRONMENT_INITIALIZER callback', async () => {
      let capturedValue = '';
      
      await createApplicationHarness({
        providers: [
          { provide: TEST_TOKEN, useValue: 'env-callback-value' },
          {
            provide: ENVIRONMENT_INITIALIZER,
            useFactory: () => {
              return () => {
                capturedValue = inject(TEST_TOKEN);
              };
            },
            multi: true,
          },
        ],
      });
      
      expect(capturedValue).toBe('env-callback-value');
    });

    it('supports inject() inside PLATFORM_INITIALIZER callback', async () => {
      let capturedValue = '';
      
      await createApplicationHarness({
        providers: [
          { provide: TEST_TOKEN, useValue: 'platform-callback-value' },
          {
            provide: PLATFORM_INITIALIZER,
            useFactory: () => {
              return () => {
                capturedValue = inject(TEST_TOKEN);
              };
            },
            multi: true,
          },
        ],
      });
      
      expect(capturedValue).toBe('platform-callback-value');
    });

    it('supports inject() inside async APP_INITIALIZER callback (inject before await)', async () => {
      let capturedValue = '';
      
      await createApplicationHarness({
        providers: [
          { provide: TEST_TOKEN, useValue: 'async-callback-value' },
          {
            provide: APP_INITIALIZER,
            useFactory: () => {
              return async () => {
                // inject() must be called before any await to stay in injection context
                capturedValue = inject(TEST_TOKEN);
                await Promise.resolve();
              };
            },
            multi: true,
          },
        ],
      });
      
      expect(capturedValue).toBe('async-callback-value');
    });
  });

  describe('Using inject() with useValue', () => {
    const TEST_TOKEN = new InjectionToken<string>('TEST_TOKEN');
    
    it('supports inject() in APP_INITIALIZER useValue function', async () => {
      let capturedValue = '';
      
      const initializerFn = () => {
        capturedValue = inject(TEST_TOKEN);
      };
      
      await createApplicationHarness({
        providers: [
          { provide: TEST_TOKEN, useValue: 'use-value-init' },
          {
            provide: APP_INITIALIZER,
            useValue: initializerFn,
            multi: true,
          },
        ],
      });
      
      expect(capturedValue).toBe('use-value-init');
    });

    it('supports inject() in PLATFORM_INITIALIZER useValue function', async () => {
      let capturedValue = '';
      
      const initializerFn = () => {
        capturedValue = inject(TEST_TOKEN);
      };
      
      await createApplicationHarness({
        providers: [
          { provide: TEST_TOKEN, useValue: 'use-value-platform' },
          {
            provide: PLATFORM_INITIALIZER,
            useValue: initializerFn,
            multi: true,
          },
        ],
      });
      
      expect(capturedValue).toBe('use-value-platform');
    });

    it('supports inject() in APP_BOOTSTRAP_LISTENER useValue function', async () => {
      let capturedValue = '';
      
      const listenerFn = () => {
        capturedValue = inject(TEST_TOKEN);
      };
      
      await createApplicationHarness({
        providers: [
          { provide: TEST_TOKEN, useValue: 'use-value-bootstrap' },
          {
            provide: APP_BOOTSTRAP_LISTENER,
            useValue: listenerFn,
            multi: true,
          },
        ],
      });
      
      expect(capturedValue).toBe('use-value-bootstrap');
    });
  });
});
