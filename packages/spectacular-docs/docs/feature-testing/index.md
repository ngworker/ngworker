---
id: index
slug: /feature-testing
sidebar_label: Introduction
title: Feature testing
---

Spectacular's feature testing API configures the Angular testing module and sets
up a test harness for a routed Angular feature module. It contains a few
companion services that wrap Angular's built-in navigation services, but
adjusted to the Angular feature module under test.

The feature test harness is used to test routed feature modules and shell
modules.

## Feature tests

The purpose of feature tests is to test a part of our application _as a user_,
that is by interacting with the DOM both to trigger side effects and assert
their observable outcome from a user perspective.

Spectacular does not provide an API for interacting with the DOM. We can use
Angular's testing APIs such as debug elements for this. Alternatively, we
combine Spectacular with Angular Testing Library or Angular component harnesses.

The scope of a feature test is a routed Angular module. It can contain multiple
routed components, multiple routing components, route guards, route resolvers,
and multiple services in addition to the components and the directives,
components, and pipes used by their component template.

A feature test uses real routing services and data structures such as:

- The `Router` service
- The `Location` service
- `ActivatedRoute` services
- `ActivatedRouteSnapshot`
- `Route`
- `RouterStateSnapshot`
- `UrlTree`

In a single test case, it's possible to navigate around the entire Angular
feature. We can perform full user flows if it makes sense or we can assert one
step at a time without having to worry about setting up complex test doubles for
routing and navigation.

The feature testing harness provides convenience wrappers for the `Location` and
`Router` services, namely the
[`SpectacularFeatureLocation`](api/classes/spectacularfeaturelocation) and
[`SpectacularFeatureRouter`](api/classes/spectacularfeaturerouter) services,
respectively. They allow to navigate relatively to the root feature route and
query for the activated route path relative to the root feature route. The tilde
(`~`) character denotes a feature-relative route path.

## Example Angular feature

As an example, we're going to create integration tests for the crisis center
feature from
[the Tour of Heroes routing tutorial](https://angular.io/guide/router-tutorial-toh).

The following code snippet shows its routed feature module, the
`CrisisCenterModule`:

```ts {13}
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';

import { CrisisCenterRoutingModule } from './crisis-center-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, CrisisCenterRoutingModule],
  declarations: [
    CrisisCenterComponent,
    CrisisListComponent,
    CrisisCenterHomeComponent,
    CrisisDetailComponent,
  ],
})
export class CrisisCenterModule {}
```

Notice the routing module in the highlighted line which is listed in the
following code block:

```ts {23,24-26}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from './can-deactivate.guard';
import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { CrisisDetailResolverService } from './crisis-detail-resolver.service';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';

const crisisCenterRoutes: Routes = [
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              crisis: CrisisDetailResolverService,
            },
          },
          {
            path: '',
            component: CrisisCenterHomeComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crisisCenterRoutes)],
  exports: [RouterModule],
})
export class CrisisCenterRoutingModule {}
```

Our feature tests are going to focus on the crisis detail form. Notice the route
guard and route resolver added to the crisis detail route in the highlighted
lines. These are going to be activated as part of our test cases.

## Integration testing an Angular feature with the Angular testbed

Let's first explore how we can perform a multi-step feature test using the
Angular testbed.

### Declaring a test root component

First, we're going to declare a test root component with a router outlet as seen
in the following snippet:

```ts {4-8,13}
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'test-app',
  template: '<router-outlet><router-outlet>',
})
class TestAppComponent {}

describe('Tour of Heroes: Crisis center integration tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
    });
  });
});
```

### Bootstrapping a test root component

Now, we're going to bootstrap our test root component:

```ts {8,11}
import { ComponentFixture, TestBed } from '@angular/core/testing';

// (...)

describe('Tour of Heroes: Crisis center integration tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
    });

    rootFixture = TestBed.createComponent(TestAppComponent);
  });

  let rootFixture: ComponentFixture<TestAppComponent>;
});
```

### Registering a routed feature module with the Angular testing module

Next, we'll add the routed feature module to our test setup:

```ts {13-15}
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';

describe('Tour of Heroes: Crisis center integration tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: crisisCenterPath, loadChildren: () => CrisisCenterModule },
        ]),
      ],
    });
    // (...)
  });
});
```

`RouterTestingModule` isolates Angular's routing APIs from browser APIs by
providing `SpyLocation` for Angular's `Location` service and
`MockLocationStrategy` for Angular's `LocationStrategy` service.

`RouterTestingModule.withRoutes` accepts routes which are registered with the
Angular testing module in the same way that we would pass top-level routes to
`RouterModule.forRoot` in an Angular application. The routes are attached to the
router outlet in our test root component.

We register the following route configuration:

```ts
{ path: crisisCenterPath, loadChildren: () => CrisisCenterModule },
```

Notice that we are registering the same route path for the feature module as we
are registering in our Angular application. `crisisCenterPath` is a variable
which has been assigned to the value `'crisis-center'`.

In our Angular application, the crisis center feature is lazy-loaded which means
that the route configuration would look something like the following snippet:

```ts {4-10}
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: crisisCenterPath,
        loadChildren: () =>
          import('@tour-of-heroes/crisis-center').then(
            m => m.CrisisCenterModule
          ),
      },
      // (...)
    ]),
  ],
})
export class AppRoutingModule {}
```

There is no practical difference between lazy-loaded and eagerly loaded feature
modules in unit and integration tests. When we return a feature module class--in
this case `CrisisCenterModule`--from a `loadChildren` callback, everything works
as intended when running our tests.

### Resolving navigation and data services

Many feature tests make use of Angular's `Location` and `Router` services. In
the following code snippet, we resolve them and relevant data services using
`TestBed.inject`:

```ts {11-13,17-19}
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CrisisService } from '@tour-of-heroes/crisis-center';

// (...)

describe('Tour of Heroes: Crisis center integration tests', () => {
  beforeEach(() => {
    // (...)
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    crisisService = TestBed.inject(CrisisService);
  });

  // (...)
  let crisisService: CrisisService;
  let location: Location;
  let router: Router;
});
```

### Initializing feature navigation

By default, we will start our feature test cases by navigating to the default
feature route. This is shown in the following code snippet which also
illustrates how we enable automatic change detection:

```ts {10,14}
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { crisisCenterPath } from '@tour-of-heroes/crisis-center';

// (...)

describe('Tour of Heroes: Crisis center integration tests', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      // (...)
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });

    // (...)
    await rootFixture.ngZone?.run(() => router.navigate([crisisCenterPath]));
  });
  // (...)
});
```

As seen in the last highlighted line, we navigate in the context of the `NgZone`
because otherwise warnings are emitted when running our tests. Once again, we
reuse the `crisisCenterPath` variable only this time to navigate to the default
feature route which happens to activate the following components:

- `CrisisCenterComponent`
- `CrisisListComponent`
- `CrisisCenterHomeComponent`

as seen in the routes registered by `CrisisCenterRoutingModule`.

### A complete test setup for a feature with the Angular testbed

With all of the above, we now have the following test setup for our feature
tests:

```ts
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CrisisCenterModule,
  crisisCenterPath,
  CrisisService,
} from '@tour-of-heroes/crisis-center';

@Component({
  selector: 'test-app',
  template: '<router-outlet><router-outlet>',
})
class TestAppComponent {}

describe('Tour of Heroes: Crisis center integration tests', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: crisisCenterPath, loadChildren: () => CrisisCenterModule },
        ]),
      ],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });

    rootFixture = TestBed.createComponent(TestAppComponent);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    crisisService = TestBed.inject(CrisisService);
    await rootFixture.ngZone?.run(() => router.navigate([crisisCenterPath]));
  });

  let crisisService: CrisisService;
  let location: Location;
  let rootFixture: ComponentFixture<TestAppComponent>;
  let router: Router;
});
```

We have managed to:

1. Declare a test root component
1. Isolate Angular's routing services from the browser APIs
1. Register the routed feature module
1. Enable automatic change detection
1. Bootstrap the test root component
1. Resolve navigation and data services
1. Initialize feature navigation

That's quite an impressive setup. However, we need all of these setup steps for
every Angular feature test, not only when testing the crisis center feature.
