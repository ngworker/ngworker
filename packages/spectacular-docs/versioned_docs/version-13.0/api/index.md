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

- Angular >=13.0
- RxJS >=6.5 \<7.0 or >=7.4
- TypeScript >=4.4

Published with partial Ivy compilation.

## Application testing

Spectacular's application testing API configures the Angular testing module and
bootstraps a component while ensuring that all application-level hooks are run.

The application test harness is used to test configuration Angular modules,
bootstrap listeners, and application initializers.

### Public API

| Export name                                                                    | Kind                                                                                      | Description                                                                                                                                                       |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`createApplicationHarness`](./modules#createapplicationharness)               | Factory for [`SpectacularApplicationHarness`](./interfaces/SpectacularApplicationHarness) | Bootstrap a Spectacular application with the specified metadata. Useful to test configuration Angular modules, bootstrap listeners, and application initializers. |
| [`CreateApplicationHarnessOptions`](./modules#createapplicationharnessoptions) | Options for [`createApplicationHarness`](./modules#createapplicationharness)              | Application harness options.                                                                                                                                      |
| [`SpectacularApplicationHarness`](./interfaces/SpectacularApplicationHarness)  | Interface                                                                                 | A harness for testing application-level software artifacts.                                                                                                       |

## Feature testing

Spectacular's feature testing API configures the Angular testing module and sets
up a test harness for a routed Angular feature module. It contains a few
companion services that wrap Angular's built-in navigation services, but
adjusted to the Angular feature module under test.

The feature test harness is used to test routed feature modules and shell
modules.

### Public API

| Export name                                                                                     | Kind                                                                                       | Description                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`createFeatureHarness`](./modules#createfeatureharness)                                        | Factory for [`SpectacularFeatureHarness`](./interfaces/SpectacularFeatureHarness)          | Configure [`SpectacularFeatureTestingModule`](./classes/SpectacularFeatureTestingModule), bootstrap [`SpectacularAppComponent`](./classes/SpectacularAppComponent) and navigate to the default feature route. |
| [`CreateFeatureHarnessOptions`](./interfaces/CreateFeatureHarnessOptions)                       | Options for [`createFeatureHarness`](./modules#createfeatureharness)                       | Feature harness options.                                                                                                                                                                                      |
| [`provideSpectacularFeatureTest`](./modules#providespectacularfeaturetest)                      | Provider factory                                                                           | Configure [`SpectacularFeatureLocation`](./classes/SpectacularFeatureLocation) and [`SpectacularFeatureRouter`](./classes/SpectacularFeatureRouter)                                                           |
| [`ProvideSpectacularFeatureTestOptions`](./interfaces/ProvideSpectacularFeatureTestOptions)     | Options for [`provideSpectacularFeatureTest`](./modules#providespectacularfeaturetest)     | Spectacular feature test options.                                                                                                                                                                             |
| [`SpectacularFeatureHarness`](./interfaces/SpectacularFeatureHarness)                           | Interface                                                                                  | A harness for testing an Angular feature module.                                                                                                                                                              |
| [`SpectacularFeatureTestingModule`](./classes/SpectacularFeatureTestingModule)                  | Angular testing configuration module                                                       | Configure the [`RouterTestingModule`](https://v13.angular.io/api/router/testing/RouterTestingModule) and provide Spectactular services for testing feature modules.                                           |
| [`SpectacularFeatureTestingModuleOptions`](./interfaces/SpectacularFeatureTestingModuleOptions) | Options for [`SpectacularFeatureTestingModule`](./classes/SpectacularFeatureTestingModule) | Feature testing options for [`SpectacularFeatureTestingModule.withFeature`](./classes/SpectacularFeatureTestingModule#withfeature).                                                                           |
| [`SpectacularFeatureLocation`](./classes/SpectacularFeatureLocation)                            | Service                                                                                    | A subset of Angular's [`Location`](https://v13.angular.io/api/common/Location) service adjusted to the Angular feature module under test.                                                                     |
| [`SpectacularFeatureRouter`](./classes/SpectacularFeatureRouter)                                | Service                                                                                    | A subset of Angular's [`Router`](https://v13.angular.io/api/router/Router) service adjusted to the Angular feature module under test.                                                                         |

### Internal API

| Export name                                                                            | Kind                                          | Description                                                                                                                        |
| -------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [`SpectacularFeatureTestingRootModule`](./classes/SpectacularFeatureTestingRootModule) | Internal Angular testing configuration module | Internal use only. Used by [`SpectacularFeatureTestingModule.withFeature`](./classes/SpectacularFeatureTestingModule#withfeature). |

## Pipe testing

Spectacular's pipe testing API configures the Angular testing module and sets up
a host component for the Angular pipe under test.

### Public API

| Export name                                                         | Kind                                                                 | Description                                              |
| ------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| [`createPipeHarness`](./modules#createpipeharness)                  | [`SpectacularPipeHarness`](./classes/SpectacularPipeHarness) factory | Set up a host component for the Angular pipe under test. |
| [`CreatePipeHarnessOptions`](./interfaces/CreatePipeHarnessOptions) | Options for [`createPipeHarness`](./modules#createpipeharness)       | Angular pipe harness options.                            |
| [`SpectacularPipeHarness`](./classes/SpectacularPipeHarness)        | Interface                                                            | A harness for testing an Angular pipe.                   |

## Shared

Test utilities used by Spectacular's other APIs.

### Public API

| Export name                                                    | Kind                   | Description                                                                                  |
| -------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------- |
| [`SpectacularAppComponent`](./classes/SpectacularAppComponent) | Bootstrapped component | The root component which is bootstrapped for a Spectacular test.                             |
| [`spectacularAppTag`](./modules#spectacularapptag)             | String                 | The tag name of [`SpectacularAppComponent`](./classes/SpectacularAppComponent)s DOM element. |
