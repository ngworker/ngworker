# Spectacular

## @ngworker/spectacular

> Spectacular Angular integration testing.

Spectacular offers test harnesses for Angular applications and libraries.

<p align="center">
 <img width="300" height="300" src="https://cdn.jsdelivr.net/gh/ngworker/ngworker@main/packages/spectacular/src/assets/logo.png" />
</p>

## Compatibility

Required peer dependencies:

- Angular >=16.0
- RxJS >=6.5 <7.0 or >=7.4
- TypeScript >=4.9

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

| Export name                                                                                    | Kind                                                                                         | Description                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`createFeatureHarness`](./modules#createfeatureharness)                                       | Factory for [`SpectacularFeatureHarness`](./interfaces/SpectacularFeatureHarness)            | Configure [`provideSpectacularFeatureTesting`](./modules#providespectacularfeaturetesting), bootstrap [`SpectacularAppComponent`](./classes/SpectacularAppComponent) and navigate to the default feature route. |
| [`CreateFeatureHarnessOptions`](./interfaces/CreateFeatureHarnessOptions)                      | Options for [`createFeatureHarness`](./modules#createfeatureharness)                         | Feature harness options.                                                                                                                                                                                        |
| [`provideSpectacularFeatureTesting`](./modules#providespectacularfeaturetesting)               | Provider factory                                                                             | Configure [`SpectacularFeatureLocation`](./classes/SpectacularFeatureLocation) and [`SpectacularFeatureRouter`](./classes/SpectacularFeatureRouter)                                                             |
| [`ProvideSpectacularFeatureTestingOptions`](./interfaces/ProvideSpectacularFeatureTestOptions) | Options for [`provideSpectacularFeatureTesting`](./modules#providespectacularfeaturetesting) | Spectacular feature testing options.                                                                                                                                                                            |
| [`SpectacularFeatureHarness`](./interfaces/SpectacularFeatureHarness)                          | Interface                                                                                    | A harness for testing an Angular feature module.                                                                                                                                                                |
| [`SpectacularFeatureLocation`](./classes/SpectacularFeatureLocation)                           | Service                                                                                      | A subset of Angular's [`Location`](https://angular.io/api/common/Location) service adjusted to the Angular feature module under test.                                                                           |
| [`SpectacularFeatureRouter`](./classes/SpectacularFeatureRouter)                               | Service                                                                                      | A subset of Angular's [`Router`](https://angular.io/api/router/Router) service adjusted to the Angular feature module under test.                                                                               |
| [`withInitialFeatureNavigation`](./modules#withinitialfeaturenavigation)                       | Feature provider                                                                             | Enables initial feature navigation.                                                                                                                                                                             |

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
