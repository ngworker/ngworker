import { APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, FactoryProvider, NgModule } from '@angular/core';

import { bootstrapTestApplication } from './bootstrap-test-application';

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
    initialized = true;
  },
};

@NgModule({
  providers: [applicationInitializer],
})
class InitializerModule {}

describe(bootstrapTestApplication.name, () => {
  beforeEach(() => {
    initialized = false;
  });

  it('registers and runs the specified bootstrap listener', () => {
    bootstrapTestApplication({
      providers: [bootstrapListener],
    });

    expect(initialized).toBe(true);
  });

  it('registers and runs the specified initializer', () => {
    bootstrapTestApplication({
      providers: [applicationInitializer],
    });

    expect(initialized).toBe(true);
  });

  it('registers the specified configuration Angular module', () => {
    bootstrapTestApplication({
      imports: [InitializerModule],
    });

    expect(initialized).toBe(true);
  });
});
