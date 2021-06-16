---
id: index
slug: /application-testing
sidebar_label: Introduction
title: Application testing
---

Spectacular's application testing API configures the Angular testing module and
bootstraps a component while ensuring that all application-level hooks are run.

The application test harness is used to test configuration Angular modules,
bootstrap listeners, and application initializers.

While it's possible to test application initializers using Angular's testbed,
it's not possible to test bootstrap listeners without additional test setup.

The reason is that the Angular testbed doesn't bootstrap an Angular module. In
fact, the testbed doesn't support a way of doing so. Bootstrap listeners are
only run after bootstrapping an Angular module.

Spectacular's application testing API builds upon test setup from Angular test
suites. Thank you for the inspiration!

## Testing a synchronous application initializer with the Angular testbed

To see what's possible with Angular's testbed, let's start by testing a simple
synchronous application initializer.

First, we set up a shared `initialized` variable that is reset to `false`
between test cases:

```ts {3,6}
describe('Application initializers', () => {
  beforeEach(() => {
    initialized = false;
  });

  let initialized: boolean;
});
```

Next, we create an application initializer that sets the `initialized` variable
to `true` when run:

```ts {8-14}
import { APP_INITIALIZER, FactoryProvider } from '@angular/core';

describe('Application initializers', () => {
  beforeEach(() => {
    initialized = false;
  });

  const applicationInitializer: FactoryProvider = {
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: () => (): void => {
      initialized = true;
    },
  };
  let initialized: boolean;
});
```

Now we add a test case in which we provide the synchronous application
initializer and assert `initialized` to be `true`:

```ts {19-21,23}
import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('Application initializers', () => {
  beforeEach(() => {
    initialized = false;
  });

  const applicationInitializer: FactoryProvider = {
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: () => (): void => {
      initialized = true;
    },
  };
  let initialized: boolean;

  it('registers and runs the specified initializer', () => {
    TestBed.configureTestingModule({
      providers: [applicationInitializer],
    });

    expect(initialized).toBe(true); // Expected: false Recevied: true
  });
});
```

Our assertion fails. `initialized` is still `false`.

We have to create a component fixture for the testbed to run synchronous
application initializers.

To resolve the issue, we create a blank component to serve as the root component
for our test and we declare it in the Angular testing module as seen in the
highlighted lines:

```ts {4-8,26}
import { APP_INITIALIZER, Component, FactoryProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'test-app',
  template: '',
})
class TestAppComponent {}

describe('Application initializers', () => {
  beforeEach(() => {
    initialized = false;
  });

  const applicationInitializer: FactoryProvider = {
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: () => (): void => {
      initialized = true;
    },
  };
  let initialized: boolean;

  it('registers and runs the specified initializer', () => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      providers: [applicationInitializer],
    });

    expect(initialized).toBe(true); // Expected: false Recevied: true
  });
});
```

Finally, we create a root component fixture by calling
`TestBed.createComponent`. It's not necessary to store a reference to the
fixture as seen in this passing test case:

```ts {29}
import { APP_INITIALIZER, Component, FactoryProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'test-app',
  template: '',
})
class TestAppComponent {}

describe('Application initializers', () => {
  beforeEach(() => {
    initialized = false;
  });

  const applicationInitializer: FactoryProvider = {
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: () => (): void => {
      initialized = true;
    },
  };
  let initialized: boolean;

  it('registers and runs the specified initializer', () => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      providers: [applicationInitializer],
    });
    TestBed.createComponent(TestAppComponent);

    expect(initialized).toBe(true);
  });
});
```

Quite an amount of setup to test a synchronous application initializers.

Next, we try testing an asynchronous application initializer using the same
technique.

## Testing an asynchronous application initializer with the Angular testbed

Let's apply the test setup from the previous section to an asynchronous
application initializer. We'll replace the function returned by the initializer
factory with an asynchronous function which waits for a resolved promise before
setting the `initialized` variable to true:

```ts {11-14}
import { APP_INITIALIZER, FactoryProvider } from '@angular/core';

describe('Application initializers', () => {
  beforeEach(() => {
    initialized = false;
  });

  const asyncApplicationInitializer: FactoryProvider = {
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: () => async (): Promise<void> => {
      await Promise.resolve();
      initialized = true;
    },
  };
  let initialized: boolean;
});
```

Excuse the typing. It's just TypeScript.

The rest of the setup is kept the same. We have an empty root component and we
provide the application initializer as seen in the following example:

```ts {}
import { APP_INITIALIZER, Component, FactoryProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'test-app',
  template: '',
})
class TestAppComponent {}

describe('Application initializers', () => {
  beforeEach(() => {
    initialized = false;
  });

  const asyncApplicationInitializer: FactoryProvider = {
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: () => async (): Promise<void> => {
      await Promise.resolve();
      initialized = true;
    },
  };
  let initialized: boolean;

  it('registers and runs the specified initializer', () => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      providers: [asyncApplicationInitializer],
    });
    TestBed.createComponent(TestAppComponent);

    expect(initialized).toBe(true); // Expected: true Received: false
  });
});
```

Oh no, our assertion is failing! The asynchronous application initializer has
not completed yet.

To resolve this issue, we turn the test case into an `async` function so that we
can use an `await` statement. We store a reference to the root component fixture
in the `rootFixture` variable, call its `whenStable` method and await the
returned promise.

```ts {25,30-31}
import { APP_INITIALIZER, Component, FactoryProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'test-app',
  template: '',
})
class TestAppComponent {}

describe('Application initializers', () => {
  beforeEach(() => {
    initialized = false;
  });

  const asyncApplicationInitializer: FactoryProvider = {
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: () => async (): Promise<void> => {
      await Promise.resolve();
      initialized = true;
    },
  };
  let initialized: boolean;

  it('registers and runs the specified initializer', async () => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      providers: [asyncApplicationInitializer],
    });
    const rootFixture = TestBed.createComponent(TestAppComponent);
    await rootFixture.whenStable();

    expect(initialized).toBe(true);
  });
});
```

Success!

Well, depending on how we look at it. Even more boilerplate to test the simplest
possible asynchronous application initializer.

Not only do we have to declare and bootstrap an empty root component. We also
have to wait for its component test fixture to become stable before
`initialized` is set to `true`.

Let's apply this technique to bootstrap listeners next.

## Testing a bootstrap listener with the Angular testbed
