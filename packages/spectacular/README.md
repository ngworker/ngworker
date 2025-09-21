# Spectacular

## @ngworker/spectacular

> Spectacular Angular integration testing.

Spectacular offers test harnesses for Angular applications and libraries.

<p align="center">
 <img width="300" height="300" src="https://cdn.jsdelivr.net/gh/ngworker/ngworker@main/packages/spectacular/src/assets/logo.png" />
</p>

## Compatibility

Required peer dependencies:

- Angular >=18.0
- RxJS >=6.5 \<7.0 or >=7.4
- TypeScript >=5.4

Published with partial Ivy compilation.

## Application testing

Spectacular's application testing API configures the Angular testing module and bootstraps a component while ensuring that all application-level hooks are run.

The application test harness is used to test configuration Angular modules, bootstrap listeners, and application initializers.

### Public API

| Export name | Kind | Description |
| --- | --- | --- |
| [`createApplicationHarness`](./functions/createApplicationHarness.md) | Factory for [`SpectacularApplicationHarness`](./interfaces/SpectacularApplicationHarness.md) | Bootstrap a Spectacular application with the specified metadata. Useful to test configuration Angular modules, bootstrap listeners, and application initializers. |
| [`CreateApplicationHarnessOptions`](./type-aliases/CreateApplicationHarnessOptions.md) | Options for [`createApplicationHarness`](./functions/createApplicationHarness.md) | Application harness options. |
| [`SpectacularApplicationHarness`](./interfaces/SpectacularApplicationHarness.md) | Interface | A harness for testing application-level software artifacts. |

## Feature testing

Spectacular's feature testing API configures the Angular testing module and sets up a test harness for a routed Angular feature module. It contains a few companion services that wrap Angular's built-in navigation services, but adjusted to the Angular feature module under test.

The feature test harness is used to test routed feature modules and shell modules.

### Public API

| Export name | Kind | Description |
| --- | --- | --- |
| [`createFeatureHarness`](./functions/createFeatureHarness.md) | Factory for [`SpectacularFeatureHarness`](./interfaces/SpectacularFeatureHarness.md) | Configure [`provideSpectacularFeatureTesting`](./functions/provideSpectacularFeatureTesting.md), bootstrap [`SpectacularAppComponent`](./classes/SpectacularAppComponent.md) and navigate to the default feature route. |
| [`CreateFeatureHarnessOptions`](./interfaces/CreateFeatureHarnessOptions.md) | Options for [`createFeatureHarness`](./functions/createFeatureHarness.md) | Feature harness options. |
| [`provideSpectacularFeatureTesting`](./functions/provideSpectacularFeatureTesting.md) | Provider factory | Configure [`SpectacularFeatureLocation`](./classes/SpectacularFeatureLocation.md) and [`SpectacularFeatureRouter`](./classes/SpectacularFeatureRouter.md) |
| [`ProvideSpectacularFeatureTestingOptions`](./interfaces/ProvideSpectacularFeatureTestingOptions.md) | Options for [`provideSpectacularFeatureTesting`](./functions/provideSpectacularFeatureTesting.md) | Spectacular feature testing options. |
| [`SpectacularFeatureHarness`](./interfaces/SpectacularFeatureHarness.md) | Interface | A harness for testing an Angular feature module. |
| [`SpectacularFeatureLocation`](./classes/SpectacularFeatureLocation.md) | Service | A subset of Angular's [`Location`](https://angular.io/api/common/Location) service adjusted to the Angular feature module under test. |
| [`SpectacularFeatureRouter`](./classes/SpectacularFeatureRouter.md) | Service | A subset of Angular's [`Router`](https://angular.io/api/router/Router) service adjusted to the Angular feature module under test. |
| [`withInitialFeatureNavigation`](./functions/withInitialFeatureNavigation.md) | Feature provider | Enables initial feature navigation. |

## Pipe testing

Spectacular's pipe testing API configures the Angular testing module and sets up a host component for the Angular pipe under test.

### Public API

| Export name | Kind | Description |
| --- | --- | --- |
| [`createPipeHarness`](./functions/createPipeHarness.md) | [`SpectacularPipeHarness`](./classes/SpectacularPipeHarness.md) factory | Set up a host component for the Angular pipe under test. |
| [`CreatePipeHarnessOptions`](./interfaces/CreatePipeHarnessOptions.md) | Options for [`createPipeHarness`](./functions/createPipeHarness.md) | Angular pipe harness options. |
| [`SpectacularPipeHarness`](./classes/SpectacularPipeHarness.md) | Interface | A harness for testing an Angular pipe. |

## Shared

Test utilities used by Spectacular's other APIs.

### Public API

| Export name | Kind | Description |
| --- | --- | --- |
| [`SpectacularAppComponent`](./classes/SpectacularAppComponent.md) | Bootstrapped component | The root component which is bootstrapped for a Spectacular test. |
| [`spectacularAppTag`](./variables/spectacularAppTag.md) | String | The tag name of [`SpectacularAppComponent`](./classes/SpectacularAppComponent.md)s DOM element. |
