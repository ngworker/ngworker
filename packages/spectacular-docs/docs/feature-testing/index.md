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
routed components, multiple routing components, route guards, and multiple
services in addition to the components and the directives, components, and pipes
used by their component template.

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
