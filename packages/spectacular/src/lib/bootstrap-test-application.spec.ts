import { APP_INITIALIZER, FactoryProvider, NgModule } from '@angular/core';

import { bootstrapTestApplication } from './bootstrap-test-application';

let initialized = false;

const initializer: FactoryProvider = {
  multi: true,
  provide: APP_INITIALIZER,
  useFactory: () => () => {
    initialized = true;
  },
};

@NgModule({
  providers: [initializer],
})
class InitializerModule {}

describe(bootstrapTestApplication.name, () => {
  beforeEach(() => {
    initialized = false;
  });

  it('registers and runs the specified initializer', () => {
    bootstrapTestApplication({
      providers: [initializer],
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
