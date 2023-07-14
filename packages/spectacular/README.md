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
- RxJS >=6.5 <7.0 or >=7.4
- TypeScript >=4.4

Published with partial Ivy compilation.

## Application testing

Spectacular's application testing API configures the Angular testing module and
bootstraps a component while ensuring that all application-level hooks are run.

The application test harness is used to test configuration Angular modules,
bootstrap listeners, and application initializers.

### Public API

| Export name                                                                            | Kind                                                                                              | Description                                                                                                                                                       |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`createApplicationHarness`](/docs/api/modules#createapplicationharness)               | Factory for [`SpectacularApplicationHarness`](/docs/api/interfaces/SpectacularApplicationHarness) | Bootstrap a Spectacular application with the specified metadata. Useful to test configuration Angular modules, bootstrap listeners, and application initializers. |
| [`CreateApplicationHarnessOptions`](/docs/api/modules#createapplicationharnessoptions) | Options for [`createApplicationHarness`](/docs/api/modules#createapplicationharness)              | Application harness options.                                                                                                                                      |
| [`SpectacularApplicationHarness`](/docs/api/interfaces/SpectacularApplicationHarness)  | Interface                                                                                         | A harness for testing application-level software artifacts.                                                                                                       |

## Feature testing

Spectacular's feature testing API configures the Angular testing module and sets
up a test harness for a routed Angular feature module. It contains a few
companion services that wrap Angular's built-in navigation services, but
adjusted to the Angular feature module under test.

The feature test harness is used to test routed feature modules and shell
modules.

### Public API

| Export name                                                                                             | Kind                                                                                               | Description                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`createFeatureHarness`](/docs/api/modules#createfeatureharness)                                        | Factory for [`SpectacularFeatureHarness`](/docs/api/interfaces/SpectacularFeatureHarness)          | Configure [`SpectacularFeatureTestingModule`](/docs/api/classes/SpectacularFeatureTestingModule), bootstrap [`SpectacularAppComponent`](/docs/api/classes/SpectacularAppComponent) and navigate to the default feature route. |
| [`CreateFeatureHarnessOptions`](/docs/api/interfaces/CreateFeatureHarnessOptions)                       | Options for [`createFeatureHarness`](/docs/api/modules#createfeatureharness)                       | Feature harness options.                                                                                                                                                                                                      |
| [`provideSpectacularFeatureTest`](/docs/api/modules#providespectacularfeaturetest)                      | Provider factory                                                                                   | Configure [`SpectacularFeatureLocation`](/docs/api/classes/SpectacularFeatureLocation) and [`SpectacularFeatureRouter`](/docs/api/classes/SpectacularFeatureRouter)                                                           |
| [`ProvideSpectacularFeatureTestOptions`](/docs/api/interfaces/ProvideSpectacularFeatureTestOptions)     | Options for [`provideSpectacularFeatureTest`](/docs/api/modules#providespectacularfeaturetest)     | Spectacular feature test options.                                                                                                                                                                                             |
| [`SpectacularFeatureHarness`](/docs/api/interfaces/SpectacularFeatureHarness)                           | Interface                                                                                          | A harness for testing an Angular feature module.                                                                                                                                                                              |
| [`SpectacularFeatureTestingModule`](/docs/api/classes/SpectacularFeatureTestingModule)                  | Angular testing configuration module                                                               | Configure the [`RouterTestingModule`](https://angular.io/api/router/testing/RouterTestingModule) and provide Spectactular services for testing feature modules.                                                               |
| [`SpectacularFeatureTestingModuleOptions`](/docs/api/interfaces/SpectacularFeatureTestingModuleOptions) | Options for [`SpectacularFeatureTestingModule`](/docs/api/classes/SpectacularFeatureTestingModule) | Feature testing options for [`SpectacularFeatureTestingModule.withFeature`](/docs/api/classes/SpectacularFeatureTestingModule#withfeature).                                                                                   |
| [`SpectacularFeatureLocation`](/docs/api/classes/SpectacularFeatureLocation)                            | Service                                                                                            | A subset of Angular's [`Location`](https://angular.io/api/common/Location) service adjusted to the Angular feature module under test.                                                                                         |
| [`SpectacularFeatureRouter`](/docs/api/classes/SpectacularFeatureRouter)                                | Service                                                                                            | A subset of Angular's [`Router`](https://angular.io/api/router/Router) service adjusted to the Angular feature module under test.                                                                                             |

### Internal API

| Export name                                                                                    | Kind                                          | Description                                                                                                                                |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [`SpectacularFeatureTestingRootModule`](/docs/api/classes/SpectacularFeatureTestingRootModule) | Internal Angular testing configuration module | Internal use only. Used by [`SpectacularFeatureTestingModule.withFeature`](/docs/api/classes/SpectacularFeatureTestingModule#withfeature). |

## Pipe testing

Spectacular's pipe testing API configures the Angular testing module and sets up
a host component for the Angular pipe under test.

### Public API

| Export name                                                                 | Kind                                                                         | Description                                              |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------- |
| [`createPipeHarness`](/docs/api/modules#createpipeharness)                  | [`SpectacularPipeHarness`](/docs/api/classes/SpectacularPipeHarness) factory | Set up a host component for the Angular pipe under test. |
| [`CreatePipeHarnessOptions`](/docs/api/interfaces/CreatePipeHarnessOptions) | Options for [`createPipeHarness`](/docs/api/modules#createpipeharness)       | Angular pipe harness options.                            |
| [`SpectacularPipeHarness`](/docs/api/classes/SpectacularPipeHarness)        | Interface                                                                    | A harness for testing an Angular pipe.                   |

## Shared

Test utilities used by Spectacular's other APIs.

### Public API

| Export name                                                            | Kind                   | Description                                                                                          |
| ---------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------- |
| [`SpectacularAppComponent`](/docs/api/classes/SpectacularAppComponent) | Bootstrapped component | The root component which is bootstrapped for a Spectacular test.                                     |
| [`spectacularAppTag`](/docs/api/modules#spectacularapptag)             | String                 | The tag name of [`SpectacularAppComponent`](/docs/api/classes/SpectacularAppComponent)s DOM element. |
