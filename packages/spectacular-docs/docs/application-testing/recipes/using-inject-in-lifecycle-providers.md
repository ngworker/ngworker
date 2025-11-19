---
title: Using inject() in lifecycle providers
---

Angular's [`inject()`](https://angular.dev/api/core/inject) function allows you to resolve dependencies functionally. `createApplicationHarness` supports using `inject()` in application lifecycle providers.

## Using inject() in factory functions

The most common pattern is to use `inject()` in the provider's factory function to capture dependencies:

```typescript
import { inject, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { createApplicationHarness } from '@ngworker/spectacular';

const CONFIG_TOKEN = new InjectionToken<AppConfig>('CONFIG_TOKEN');

it('supports inject() in factory', async () => {
  await createApplicationHarness({
    providers: [
      { provide: CONFIG_TOKEN, useValue: { apiUrl: 'https://api.example.com' } },
      {
        provide: APP_INITIALIZER,
        useFactory: () => {
          // inject() works here in the factory function
          const config = inject(CONFIG_TOKEN);
          return () => {
            // Use config in the callback
            console.log('Initializing with', config.apiUrl);
          };
        },
        multi: true,
      },
    ],
  });
});
```

## Using inject() in callback functions

`createApplicationHarness` automatically wraps lifecycle callbacks with [`runInInjectionContext()`](https://angular.dev/api/core/runInInjectionContext), enabling `inject()` to be called directly in the callback:

```typescript
import { inject, APP_INITIALIZER } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createApplicationHarness } from '@ngworker/spectacular';

it('supports inject() in callback', async () => {
  await createApplicationHarness({
    providers: [
      {
        provide: APP_INITIALIZER,
        useFactory: () => {
          return () => {
            // inject() works here in the callback too
            const http = inject(HttpClient);
            return http.get('/api/config');
          };
        },
        multi: true,
      },
    ],
  });
});
```

## Using inject() with useValue

When providing a function directly via `useValue`, `inject()` is also supported:

```typescript
import { inject, PLATFORM_INITIALIZER } from '@angular/core';
import { createApplicationHarness } from '@ngworker/spectacular';

const initializeApp = () => {
  const config = inject(CONFIG_TOKEN);
  console.log('Platform initialized with', config);
};

it('supports inject() with useValue', async () => {
  await createApplicationHarness({
    providers: [
      { provide: CONFIG_TOKEN, useValue: { version: '1.0.0' } },
      {
        provide: PLATFORM_INITIALIZER,
        useValue: initializeApp,
        multi: true,
      },
    ],
  });
});
```

## Supported lifecycle providers

`createApplicationHarness` supports `inject()` in all application lifecycle providers:

- [`APP_INITIALIZER`](https://angular.dev/api/core/APP_INITIALIZER)
- [`APP_BOOTSTRAP_LISTENER`](https://angular.dev/api/core/APP_BOOTSTRAP_LISTENER)
- [`ENVIRONMENT_INITIALIZER`](https://angular.dev/api/core/ENVIRONMENT_INITIALIZER)
- [`PLATFORM_INITIALIZER`](https://angular.dev/api/core/PLATFORM_INITIALIZER)

## Using inject() in async functions

:::warning Injection context and async boundaries

The injection context is synchronous and cannot be maintained across async boundaries. When using `inject()` in async functions, call `inject()` **before** any `await` statement:

```typescript
{
  provide: APP_INITIALIZER,
  useFactory: () => {
    return async () => {
      // ✅ Correct: inject before await
      const config = inject(CONFIG_TOKEN);
      await loadData();
      console.log(config);
      
      // ❌ Wrong: inject after await will fail
      // await loadData();
      // const config = inject(CONFIG_TOKEN); // Error: not in injection context
    };
  },
  multi: true,
}
```

:::

## See also

- [Testing a platform initializer](./testing-a-platform-initializer.md)
- [createApplicationHarness API reference](../../api/functions/createApplicationHarness.md)
- [Angular inject() function](https://angular.dev/api/core/inject)
- [Angular runInInjectionContext](https://angular.dev/api/core/runInInjectionContext)
