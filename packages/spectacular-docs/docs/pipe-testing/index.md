---
id: index
slug: /pipe-testing
sidebar_label: Introduction
title: Pipe testing
---

Spectacular's pipe testing API configures the Angular testing module and sets up
a host component for the Angular pipe under test.

The pipe test harness makes it straightforward to test pipes in the same way as
they are used in a component template. This gives us the confidence that our
Angular pipe works as intended.

## Example Angular pipe

As an example, try imagining how to test the Angular pipe in the following code
snippet:

```ts
// pow.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pow' })
export class PowPipe implements PipeTransform {
  transform(base: number, exponent = 1): number {
    return Math.pow(base, exponent);
  }
}
```

## Testing an Angular pipe in isolation with the Angular testbed

We could unit test it in isolation by exercising its `transform` method as seen
in the following example:

```ts {18}
import { TestBed } from '@angular/core/testing';

import { PowPipe } from './pow.pipe';

describe(PowPipe.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PowPipe],
    });
    pipe = TestBed.inject(PowPipe);
  });

  let pipe: PowPipe;

  it('raises the base to the power of 1 by default', () => {
    const base = 2;

    const actual = pipe.transform(base);

    expect(actual).toBe(2);
  });
});
```

How would we pass additional options? This is easy in an isolated unit test as
seen in the following test case:

```ts {5}
it('raises the base to the specified power', () => {
  const base = 5;
  const exponent = 3;

  const actual = pipe.transform(base, exponent);

  expect(actual).toBe(125);
});
```

What would that look like in a component template? Do you feel confident about
this test? Are we in control of how this is formatted in the DOM?

## Integration testing an Angular pipe with the Angular testbed

To achieve a higher level of confidence, we could create a test host component
with a template and configure the Angular testing module by declaring the test
host component and the pipe as seen in the following example:

```ts {6-12,17}
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowPipe } from './pow.pipe';

@Component({
  template: '{{ base | pow }}',
})
class TestHostComponent {
  @Input()
  base = 2;
}

describe(PowPipe.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PowPipe, TestHostComponent],
    });
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.autoDetectChanges(true);
    host = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  });

  let hostElement: HTMLElement;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
});
```

That's a lot of setup for testing a pure pipe without any dependencies, don't
you think?

With that out of the way, let us add a basic test case. In the following
example, we are exercising the pipe in a template and asserting how it's
formatted for the DOM:

```ts {2,7}
it('raises the base to the power of 1 by default', () => {
  expect(hostElement.textContent).toBe('2');

  host.base = 4;
  hostFixture.detectChanges();

  expect(hostElement.textContent).toBe('4');
});
```

To add the `exponent` option, we have to add a second input parameter to our
test host component as seen in the following example:

```ts {2,7-8}
@Component({
  template: '{{ base | pow:exponent }}',
})
class TestHostComponent {
  @Input()
  base = 2;
  @Input()
  exponent?: number;
}
```

This allows us to add the exponent option through the template as seen in the
following test case:

```ts {3}
it('raises the base to the specified power', () => {
  host.base = 5;
  host.exponent = 3;
  hostFixture.detectChanges();

  expect(hostElement.textContent).toBe('125');
});
```

## Testing an Angular pipe with Spectacular

Now, let's compare this to using Spectacular's pipe test harness. First, we set
up the pipe harness by calling a test harness factory:

```ts {10-13}
import {
  createPipeHarness,
  SpectacularPipeHarness,
} from '@ngworker/spectacular';

import { PowPipe } from './pow.pipe';

describe(PowPipe.name, () => {
  beforeEach(() => {
    harness = createPipeHarness({
      pipe: PowPipe,
      value: 2,
    });
  });

  let harness: SpectacularPipeHarness;
});
```

Without specifying a template, we can inspect how the transformed value is
formatted and rendered to the DOM:

```ts {2}
it('raises the base to the power of 1 by default', () => {
  expect(harness.text).toBe('2');

  harness.value = 4;

  expect(harness.text).toBe('4');
});
```

We can change the value and inspect the formatted value without having to
manually trigger change detection:

```ts {4,6}
it('raises the base to the power of 1 by default', () => {
  expect(harness.text).toBe('2');

  harness.value = 4;

  expect(harness.text).toBe('4');
});
```

We can easily add the `exponent` option by changing the default template:

```ts {3}
it('raises the base to the specified power', () => {
  harness.value = 5;
  harness.template = '{{ value | pow:3 }}';

  expect(harness.text).toBe('125');
});
```

It's then possible to immediately inspect the DOM again:

```ts {5}
it('raises the base to the specified power', () => {
  harness.value = 5;
  harness.template = '{{ value | pow:3 }}';

  expect(harness.text).toBe('125');
});
```

Using the pipe test harness, we call the pipe through the template of a
component without the trouble of setting up a test host component ourselves.

## Spectacular benefits

In this page, we saw traditional Angular test suites for testing an Angular pipe
and compared them to Spectacular's lightweight setup.

With the benefits of a proper integration test, Spectacular offers:

- Testing an Angular pipe in a template
- Testing a multi-parameter Angular pipe
- Testing an Angular pipe composed with other pipes
- Easily change the host component template
- Easily change the test value

Visit the other pages in this section to learn about other use cases supported
by Spectacular's pipe testing API.
