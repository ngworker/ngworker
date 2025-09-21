---
title: Testing a platform initializer
---

To test a platform initializer, add it to the [providers](../../api/type-aliases/CreateApplicationHarnessOptions) option.

```typescript {10}
import { createApplicationHarness } from '@ngworker/spectacular';
import posthog from 'posthog-js';
import { posthogInitializer } from './posthog.initializer';

describe('posthogInitializer', () => {
  it('initializes the PostHog SDK', async () => {
    jest.spyOn(posthog, 'init');

    await createApplicationHarness({
      providers: [posthogInitializer],
    });

    expect(posthog.init).toHaveBeenCalledWith({
      api_host: 'https://eu.i.posthog.com',
      defaults: '2025-05-24',
    });
  });
});
```

:::info

[createApplicationHarness](../../api/functions/createApplicationHarness) supports platform initializers provided using [PLATFORM_INITIALIZER](https://angular.io/api/core/PLATFORM_INITIALIZER).

:::
