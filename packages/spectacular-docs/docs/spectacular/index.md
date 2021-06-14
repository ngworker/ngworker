---
id: index
slug: /
sidebar_label: Introduction
title: Spectacular introduction
---

Spectacular is an integration testing library for Angular applications and
libraries. Spectacular offers specialized test harnesses making it more
convenient to test parts of Angular projects that are usually hard to test.

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

## Isolated pipe tests

We could unit test it in isolation by exercising its `transform` method as seen
in the following example:

```ts {15}
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

## Integrated pipe tests

To achieve a higher level of confidence, we could create a test host component
with a template, configure the Angular testing module by declaring the test host
component and the pipe as seen in the following example:

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

## Spectacular pipe harness

Now, let's compare this to using Spectacular's pipe test harness. First, we set
up the pipe harness by calling a test harness factory:

```ts {10-14}
import {
  createPipeHarness,
  SpectacularPipeHarness,
} from '@ngworker/spectacular';

import { PowPipe } from './pow.pipe';

describe(PowPipe.name, () => {
  beforeEach(() => {
    harness = createPipeHarness({
      pipe: PowPipe,
      pipeName: 'pow',
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

High-confidence integration tests. This is the power of Spectacular. Specialized
test harnesses make it easier to create integration tests for Angular-specific
software artifacts.

Spectacular offers the speed and the flexibility of the Angular testbed without
the framework and testbed boilerplate. Spectacular's test harnesses run our
Angular-specific software artifacts in an environment as as reasonably close to
a real Angular application as possible.

In this page, we saw traditional Angular test suites for testing an Angular pipe
and compared them to Spectacular's lightweight setup. Spectacular offers the
following testing APIs:

- [Application testing](./application-testing)
- [Feature testing](./feature-testing)
- [Pipe testing](./pipe-testing)
