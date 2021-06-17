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

  it('registers and runs the specified synchronous initializer', () => {
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

  it('registers and runs the specified synchronous initializer', () => {
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

  it('registers and runs the specified synchronous initializer', () => {
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

  it('registers and runs the specified asynchronous initializer', () => {
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

  it('registers and runs the specified asynchronous initializer', async () => {
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

We apply the test setup from the previous section to a bootstrap listener.

We replace the shared `initialized` variable with a `bootstrapped` variable that
is reset to `false` before each test case. We provide a bootstrap listener that
sets `bootstrapped` to `true` when triggered. Bootstrap listeners are passed a
`ComponentRef` of the bootstrapped root component as seen in the following
example:

```ts {19-25}
import {
  APP_BOOTSTRAP_LISTENER,
  Component,
  ComponentRef,
  FactoryProvider,
  Type,
} from '@angular/core';

@Component({
  selector: 'test-app',
  template: '',
})
class TestAppComponent {}

describe('Bootstrap listeners', () => {
  beforeEach(() => {
    bootstrapped = false;
  });

  const bootstrapListener: FactoryProvider = {
    multi: true,
    provide: APP_BOOTSTRAP_LISTENER,
    useFactory: () => (component: ComponentRef<Type<unknown>>): void => {
      bootstrapped = true;
    },
  };
  let bootstrapped: boolean;
});
```

For our simple bootstrap listener, we're not using the component reference
although we have listed it in the example above.

Next, we add a test case with the setup we applied to asynchronous application
initializers:

```ts {29-38}
import {
  APP_BOOTSTRAP_LISTENER,
  Component,
  ComponentRef,
  FactoryProvider,
  Type,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'test-app',
  template: '',
})
class TestAppComponent {}

describe('Bootstrap listeners', () => {
  beforeEach(() => {
    bootstrapped = false;
  });

  const bootstrapListener: FactoryProvider = {
    multi: true,
    provide: APP_BOOTSTRAP_LISTENER,
    useFactory: () => (component: ComponentRef<Type<unknown>>): void => {
      bootstrapped = true;
    },
  };
  let bootstrapped: boolean;

  it('registers and runs the specified bootstrap listener', async () => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      providers: [bootstrapListener],
    });
    const rootFixture = TestBed.createComponent(TestAppComponent);
    await rootFixture.whenStable();

    expect(bootstrapped).toBe(true); // Expected: true Received: false
  });
});
```

Heavens, no! The bootstrap listener has not been called at the time of our
assertion. We could make the test case wait for seconds or minutes and it
wouldn't make a difference. As mentioned in the beginning of this page,
Angular's testbed has no way of bootstrapping an Angular module and that's the
point in time that bootstrap listeners are triggered.

There's is no easy way to make this test work. It's safe to say that
Spectacular's application testing API is a good choice.

For the finale, we'll show how we can test application initializers and
bootstrap listeners with a Spectacular application test harness.

## Testing application-level hooks with Spectacular

Let's start by testing a synchronous application intitializer:

```ts {18-24}
import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { createApplicationHarness } from '@ngworker/spectacular';

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

  it('registers and runs the specified synchronous initializer', async () => {
    await createApplicationHarness({
      providers: [applicationInitializer],
    });

    expect(initialized).toBe(true);
  });
});
```

That's the whole test suite. No need to create, declare or bootstrap a blank
test root component. No need to manually configure the Angular testing module.
No need to wait for the root component fixture to stabilize.

Spectacular takes care of all of this behind the scenes. All we have to do is
pass the application initializer we want to test and verify expectations and
assertions on its side effects.

A thing worth noticing is that the application harness factory returns a promise
which resolves a Spectacular application harness. Although we're not using the
harness in this case and our application initializer is synchronous, we're
sticking with async-await for consistency with the use cases that are
demonstrated next.

Testing an asynchronous application initializer works in exactly the same way
with a Spectacular application harness:

```ts {19-25}
import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { createApplicationHarness } from '@ngworker/spectacular';

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

  it('registers and runs the specified asynchronous initializer', async () => {
    await createApplicationHarness({
      providers: [asyncApplicationInitializer],
    });

    expect(initialized).toBe(true);
  });
});
```

For asynchronous application initializers we also only need to pass the
applicaiton initializer to exercise its side effects before we can verify them.

Finally, let's see how we can test a boostrap listener with Spectacular's
application testing API.

First, we declare the bootstrap listener and manage the shared `boostrapped`
variable:

```ts {9-20}
import {
  APP_BOOTSTRAP_LISTENER,
  ComponentRef,
  FactoryProvider,
  Type,
} from '@angular/core';

describe('Bootstrap listeners', () => {
  beforeEach(() => {
    bootstrapped = false;
  });

  const bootstrapListener: FactoryProvider = {
    multi: true,
    provide: APP_BOOTSTRAP_LISTENER,
    useFactory: () => (component: ComponentRef<Type<unknown>>): void => {
      bootstrapped = true;
    },
  };
  let bootstrapped: boolean;
});
```

Finally, we add a test case using exactly the same technique as we did for the
application initializers:

```ts {23-29}
import {
  APP_BOOTSTRAP_LISTENER,
  ComponentRef,
  FactoryProvider,
  Type,
} from '@angular/core';
import { createApplicationHarness } from '@ngworker/spectacular';

describe('Bootstrap listeners', () => {
  beforeEach(() => {
    bootstrapped = false;
  });

  const bootstrapListener: FactoryProvider = {
    multi: true,
    provide: APP_BOOTSTRAP_LISTENER,
    useFactory: () => (component: ComponentRef<Type<unknown>>): void => {
      bootstrapped = true;
    },
  };
  let bootstrapped: boolean;

  it('registers and runs the specified bootstrap listener', async () => {
    await createApplicationHarness({
      providers: [bootstrapListener],
    });

    expect(bootstrapped).toBe(true);
  });
});
```

Way to go! All test cases are passing as this point.

## Spectacular benefits

While we tested the most simple application hooks possible in this page, this is
enough to demonstrate that:

- Unlike Angular's testbed, Spectacular supports testing bootstrap listeners
- A Spectacular application harness takes care of declaring and bootstrapping a
  root component
- The Spectacular application harness factory waits for application initializers
  and bootstrap listeners to finish before resolving an application harness

Visit the other pages in this section to learn about other use cases supported
by Spectacular's application testing API as well as learn about the use cases
covered in this page, in more detail.
