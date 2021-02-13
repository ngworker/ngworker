import { APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, FactoryProvider, Injectable, NgModule } from '@angular/core';

import { SpectacularAppComponent } from '../app-component/spectacular-app.component';
import { createApplicationHarness } from './create-application-harness';

let bootstrapped = false;
let initialized = false;

const applicationInitializer: FactoryProvider = {
  multi: true,
  provide: APP_INITIALIZER,
  useFactory: () => () => {
    initialized = true;
  },
};

const bootstrapListener: FactoryProvider = {
  multi: true,
  provide: APP_BOOTSTRAP_LISTENER,
  useFactory: () => () => {
    bootstrapped = true;
  },
};

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
  });

  describe('Initializers', () => {
    it('registers and runs the specified initializer', () => {
      createApplicationHarness({
        providers: [applicationInitializer],
      });

      expect(initialized).toBe(true);
    });

    it('registers the specified initializer Angular module', () => {
      createApplicationHarness({
        imports: [InitializerModule],
      });

      expect(initialized).toBe(true);
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
