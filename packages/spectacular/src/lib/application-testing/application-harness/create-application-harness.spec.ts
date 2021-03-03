import { APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, FactoryProvider, Injectable, NgModule } from '@angular/core';

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
  useFactory: () => (): void => {
    bootstrapped = true;
  },
};

@NgModule({
  providers: [asyncApplicationInitializer],
})
class AsyncInitializerModule {}

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
    const _consoleLog = console.log;
    // filter out development mode notice
    jest.spyOn(console, 'log').mockImplementation((...args) => {
      const [message] = args;

      if (
        typeof message === 'string' &&
        message.startsWith('Angular is running in development mode.')
      ) {
        return;
      }

      _consoleLog.call(console, ...args);
    });
  });

  describe('Bootstrap listeners', () => {
    it('registers and runs the specified bootstrap listener', () => {
      createApplicationHarness({
        providers: [bootstrapListener],
      });

      expect(bootstrapped).toBe(true);
    });

    it('registers the specified bootstrap listener Angular module', () => {
      createApplicationHarness({
        imports: [BootstrapListenerModule],
      });

      expect(bootstrapped).toBe(true);
    });

  describe('Initializers', () => {
    it('registers and runs the specified initializer', () => {
      createApplicationHarness({
        providers: [applicationInitializer],
      });

      expect(initialized).toBe(true);
    });

    it('registers and runs the specified asynchronous initializer', async () => {
      const harness = createApplicationHarness({
        providers: [asyncApplicationInitializer],
      });

      await harness.rootFixture.whenStable();

      expect(initialized).toBe(true);
    });

    it('registers the specified initializer Angular module', () => {
      createApplicationHarness({
        imports: [InitializerModule],
      });

      expect(initialized).toBe(true);
    });

    it('registers the specified asynchronous initializer Angular module', async () => {
      const harness = createApplicationHarness({
        imports: [AsyncInitializerModule],
      });

      await harness.rootFixture.whenStable();

      expect(initialized).toBe(true);
    });
  });

  describe('All application hooks', () => {
    it('registers and runs the specified initializer and bootstrap listener', () => {
      createApplicationHarness({
        providers: [applicationInitializer, bootstrapListener],
      });

      expect(initialized).toBe(true);
      expect(bootstrapped).toBe(true);
    });

    it('registers the specified initializer and bootstrap Angular modules', () => {
      createApplicationHarness({
        imports: [InitializerModule, BootstrapListenerModule],
      });

      expect(initialized).toBe(true);
      expect(bootstrapped).toBe(true);
    });

    it('registers and runs the specified asynchronous initializer and bootstrap listener', async () => {
      const harness = createApplicationHarness({
        providers: [asyncApplicationInitializer, bootstrapListener],
      });

      await harness.rootFixture.whenStable();

      expect(initialized).toBe(true);
      expect(bootstrapped).toBe(true);
    });

    it('registers the specified asynchronous initializer and bootstrap listener Angular modules', async () => {
      const harness = createApplicationHarness({
        imports: [AsyncInitializerModule, BootstrapListenerModule],
      });

      await harness.rootFixture.whenStable();

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

    it('adds the specified imports', () => {
      const harness = createApplicationHarness({
        imports: [AdminServiceModule],
      });

      const jobService = harness.inject(AdminService);
      expect(jobService).toBeInstanceOf(AdminService);
    });

    it('adds the specified providers', () => {
      const harness = createApplicationHarness({
        providers: [AdminService],
      });

      const jobService = harness.inject(AdminService);
      expect(jobService).toBeInstanceOf(AdminService);
    });
  });

  describe('Bootstrapping', () => {
    it(`bootstraps ${SpectacularAppComponent.name}`, () => {
      const harness = createApplicationHarness();

      expect(harness.rootComponent).toBeInstanceOf(SpectacularAppComponent);
    });
  });
});
