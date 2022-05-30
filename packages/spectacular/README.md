# Spectacular

## @ngworker/spectacular

> Spectacular Angular integration testing.

Spectacular offers test harnesses for Angular applications and libraries.

<p align="center">
 <img width="300" height="300" src="https://cdn.jsdelivr.net/gh/ngworker/ngworker@main/packages/spectacular/src/assets/logo.png" />
</p>

[Visit documentation](https://ngworker.github.io/ngworker/)

## Application testing

Spectacular's application testing API configures the Angular testing module and
bootstraps a component while ensuring that all application-level hooks are run.

The application test harness is used to test configuration Angular modules,
bootstrap listeners, and application initializers.

### Public API

| Export name                       | Kind                                        | Description                                                                                                                                                       |
| --------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createApplicationHarness`        | Factory for `SpectacularApplicationHarness` | Bootstrap a Spectacular application with the specified metadata. Useful to test configuration Angular modules, bootstrap listeners, and application initializers. |
| `CreateApplicationHarnessOptions` | Options for `createApplicationHarness`      | Application harness options.                                                                                                                                      |
| `SpectacularApplicationHarness`   | Interface                                   | A harness for testing application-level software artifacts.                                                                                                       |

### Feature testing

Spectacular's feature testing API configures the Angular testing module and sets
up a test harness for a routed Angular feature module. It contains a few
companion services that wrap Angular's built-in navigation services, but
adjusted to the Angular feature module under test.

The feature test harness is used to test routed feature modules and shell
modules.

#### Public API

| Export name                              | Kind                                          | Description                                                                                                                 |
| ---------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `createFeatureHarness`                   | Factory for `SpectacularFeatureHarness`       | Configure `SpectacularFeatureTestingModule`, bootstrap `SpectacularAppComponent` and navigate to the default feature route. |
| `CreateFeatureHarnessOptions`            | Options for `createFeatureHarness`            | Feature harness options.                                                                                                    |
| `SpectacularFeatureHarness`              | Interface                                     | A harness for testing an Angular feature module.                                                                            |
| `SpectacularFeatureTestingModuleOptions` | Options for `SpectacularFeatureTestingModule` | Feature testing options for `SpectacularFeatureTestingModule.withFeature`.                                                  |
| `SpectacularFeatureTestingModule`        | Angular testing configuration module          | Configure the `RouterTestingModule` and provide Spectactular services for testing feature modules.                          |
| `SpectacularFeatureTestingRootModule`    | Internal Angular testing configuration module | Internal use only. Used by `SpectacularFeatureTestingModule.withFeature`.                                                   |
| `SpectacularFeatureLocation`             | Service                                       | A subset of Angular's `Location` service adjusted to the Angular feature module under test.                                 |
| `SpectacularFeatureRouter`               | Service                                       | A subset of Angular's `Router` service adjusted to the Angular feature module under test.                                   |

## Pipe testing

Spectacular's pipe testing API configures the Angular testing module and sets up
a host component for the Angular pipe under test.

### Public API

| Export name                | Kind                             | Description                                              |
| -------------------------- | -------------------------------- | -------------------------------------------------------- |
| `createPipeHarness`        | `SpectacularPipeHarness` factory | Set up a host component for the Angular pipe under test. |
| `CreatePipeHarnessOptions` | Options for `createPipeHarness`  | Angular pipe harness options.                            |
| `SpectacularPipeHarness`   | Interface                        | A harness for testing an Angular pipe.                   |

## Shared

Test utilities used by Spectacular's other APIs.

### Public API

| Export name               | Kind                   | Description                                                      |
| ------------------------- | ---------------------- | ---------------------------------------------------------------- |
| `SpectacularAppComponent` | Bootstrapped component | The root component which is bootstrapped for a Spectacular test. |
| `spectacularAppTag`       | String                 | The tag name of `SpectacularAppComponent`s DOM element.          |
