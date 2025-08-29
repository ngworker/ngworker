---
id: 'index'
title: '@ngworker/spectacular'
sidebar_label: 'Readme'
sidebar_position: 0
custom_edit_url: null
---

# Spectacular

## @ngworker/spectacular

> Spectacular Angular integration testing.

Spectacular offers test harnesses for Angular applications and libraries.

<p align="center">
 <img width="300" height="300" src="https://cdn.jsdelivr.net/gh/ngworker/ngworker@main/packages/spectacular/src/assets/logo.png" />
</p>

## Compatibility

Required peer dependencies:

- Angular >=15.0
- RxJS >=6.5 \<7.0 or >=7.4
- TypeScript >=4.8

Published with partial Ivy compilation.

## Application testing

Spectacular's application testing API configures the Angular testing module and
bootstraps a component while ensuring that all application-level hooks are run.

The application test harness is used to test configuration Angular modules,
bootstrap listeners, and application initializers.

### Public API

| Export name                                                                       | Kind                                                                                         | Description                                                                                                                                                       |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`createApplicationHarness`](./modules.md#createapplicationharness)               | Factory for [`SpectacularApplicationHarness`](./interfaces/SpectacularApplicationHarness.md) | Bootstrap a Spectacular application with the specified metadata. Useful to test configuration Angular modules, bootstrap listeners, and application initializers. |
| [`CreateApplicationHarnessOptions`](./modules.md#createapplicationharnessoptions) | Options for [`createApplicationHarness`](./modules.md#createapplicationharness)              | Application harness options.                                                                                                                                      |
| [`SpectacularApplicationHarness`](./interfaces/SpectacularApplicationHarness.md)  | Interface                                                                                    | A harness for testing application-level software artifacts.                                                                                                       |

## Feature testing

Spectacular's feature testing API configures the Angular testing module and sets
up a test harness for a routed Angular feature module. It contains a few
companion services that wrap Angular's built-in navigation services, but
adjusted to the Angular feature module under test.

The feature test harness is used to test routed feature modules and shell
modules.

### Public API

| Export name                                                                                                     | Kind                                                                                            | Description                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`createFeatureHarness`](./modules.md#createfeatureharness)                                                     | Factory for [`SpectacularFeatureHarness`](./interfaces/SpectacularFeatureHarness.md)            | Configure [`SpectacularFeatureTestingModule`](./classes/SpectacularFeatureTestingModule.md), bootstrap [`SpectacularAppComponent`](./classes/SpectacularAppComponent.md) and navigate to the default feature route. |
| [`CreateFeatureHarnessOptions`](./interfaces/CreateFeatureHarnessOptions.md)                                    | Options for [`createFeatureHarness`](./modules.md#createfeatureharness)                         | Feature harness options.                                                                                                                                                                                            |
| [`provideSpectacularFeatureTest`](./modules.md#providespectacularfeaturetest) (deprecated)                      | Provider factory                                                                                | Configure [`SpectacularFeatureLocation`](./classes/SpectacularFeatureLocation.md) and [`SpectacularFeatureRouter`](./classes/SpectacularFeatureRouter.md)                                                           |
| [`provideSpectacularFeatureTesting`](./modules.md#providespectacularfeaturetesting)                             | Provider factory                                                                                | Configure [`SpectacularFeatureLocation`](./classes/SpectacularFeatureLocation.md) and [`SpectacularFeatureRouter`](./classes/SpectacularFeatureRouter.md)                                                           |
| [`ProvideSpectacularFeatureTestingOptions`](./interfaces/ProvideSpectacularFeatureTestOptions.md)               | Options for [`provideSpectacularFeatureTesting`](./modules.md#providespectacularfeaturetesting) | Spectacular feature testing options.                                                                                                                                                                                |
| [`ProvideSpectacularFeatureTestOptions`](./interfaces/ProvideSpectacularFeatureTestOptions.md) (deprecated)     | Options for [`provideSpectacularFeatureTest`](./modules.md#providespectacularfeaturetest)       | Spectacular feature testing options.                                                                                                                                                                                |
| [`SpectacularFeatureHarness`](./interfaces/SpectacularFeatureHarness.md)                                        | Interface                                                                                       | A harness for testing an Angular feature module.                                                                                                                                                                    |
| [`SpectacularFeatureTestingModule`](./classes/SpectacularFeatureTestingModule.md) (deprecated)                  | Angular testing configuration module                                                            | Configure the [`RouterTestingModule`](https://v15.angular.io/api/router/testing/RouterTestingModule) and provide Spectactular services for testing feature modules.                                                 |
| [`SpectacularFeatureTestingModuleOptions`](./interfaces/SpectacularFeatureTestingModuleOptions.md) (deprecated) | Options for [`SpectacularFeatureTestingModule`](./classes/SpectacularFeatureTestingModule.md)   | Feature testing options for [`SpectacularFeatureTestingModule.withFeature`](./classes/SpectacularFeatureTestingModule.md#withfeature).                                                                              |
| [`SpectacularFeatureLocation`](./classes/SpectacularFeatureLocation.md)                                         | Service                                                                                         | A subset of Angular's [`Location`](https://v15.angular.io/api/common/Location) service adjusted to the Angular feature module under test.                                                                           |
| [`SpectacularFeatureRouter`](./classes/SpectacularFeatureRouter.md)                                             | Service                                                                                         | A subset of Angular's [`Router`](https://v15.angular.io/api/router/Router) service adjusted to the Angular feature module under test.                                                                               |
| [`withInitialFeatureNavigation`](./modules.md#withinitialfeaturenavigation)                                     | Feature provider                                                                                | Enables initial feature navigation.                                                                                                                                                                                 |

### Internal API

| Export name                                                                               | Kind                                                       | Description                                                                                                                           |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [`SpectacularFeatureTestingRootModule`](./classes/SpectacularFeatureTestingRootModule.md) | Internal Angular testing configuration module (deprecated) | Internal use only. Used by [`SpectacularFeatureTestingModule.withFeature`](./classes/SpectacularFeatureTestingModule.md#withfeature). |

## Pipe testing

Spectacular's pipe testing API configures the Angular testing module and sets up
a host component for the Angular pipe under test.

### Public API

| Export name                                                            | Kind                                                                    | Description                                              |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------- |
| [`createPipeHarness`](./modules.md#createpipeharness)                  | [`SpectacularPipeHarness`](./classes/SpectacularPipeHarness.md) factory | Set up a host component for the Angular pipe under test. |
| [`CreatePipeHarnessOptions`](./interfaces/CreatePipeHarnessOptions.md) | Options for [`createPipeHarness`](./modules.md#createpipeharness)       | Angular pipe harness options.                            |
| [`SpectacularPipeHarness`](./classes/SpectacularPipeHarness.md)        | Interface                                                               | A harness for testing an Angular pipe.                   |

## Shared

Test utilities used by Spectacular's other APIs.

### Public API

| Export name                                                       | Kind                   | Description                                                                                     |
| ----------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------- |
| [`SpectacularAppComponent`](./classes/SpectacularAppComponent.md) | Bootstrapped component | The root component which is bootstrapped for a Spectacular test.                                |
| [`spectacularAppTag`](./modules.md#spectacularapptag)             | String                 | The tag name of [`SpectacularAppComponent`](./classes/SpectacularAppComponent.md)s DOM element. |
