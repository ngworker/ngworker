# Spectacular

## @ngworker/spectacular

> Spectacular Angular testing.

## Application testing

### Public API

| Export name                       | Kind                                        | Description                                                                                                                                                       |
| --------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createApplicationHarness`        | Factory for `SpectacularApplicationHarness` | Bootstrap a Spectacular application with the specified metadata. Useful to test configuration Angular modules, bootstrap listeners, and application initializers. |
| `CreateApplicationHarnessOptions` | Options for `createApplicationHarness`      | Application harness options.                                                                                                                                      |
| `SpectacularAppComponent`         | Bootstrapped component                      | A root component for testing.                                                                                                                                     |
| `SpectacularApplicationHarness`   | Interface                                   | Application harness data structure.                                                                                                                               |
| `spectacularAppTag`               | String                                      | The tag name for `SpectacularAppComponent`s DOM element.                                                                                                          |

### Feature testing

The feature testing API helps configure the Angular testing module and sets up a
test harness for an Angular feature module. It contains a few companion services
that wrap Angular's built-in navigation services, but adjust to the Angular
feature module under test.

#### Public API

| Export name                              | Kind                                          | Description                                                                                                                    |
| ---------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `createFeatureHarness`                   | Factory for `SpectacularFeatureHarness`       | Configures `SpectacularFeatureTestingModule`, bootstraps `SpectacularAppComponent` and navigates to the default feature route. |
| `CreateFeatureHarnessOptions`            | Options for `createFeatureHarness`            | Feature harness options.                                                                                                       |
| `SpectacularFeatureHarness`              | Interface                                     | Feature harness data structure.                                                                                                |
| `SpectacularFeatureTestingModuleOptions` | Options for `SpectacularFeatureTestingModule` | Feature testing options for `SpectacularFeatureTestingModule.withFeature`.                                                     |
| `SpectacularFeatureTestingModule`        | Angular testing configuration module          | Configures the `RouterTestingModule` and provides Spectactular services for testing feature modules.                           |
| `SpectacularFeatureLocation`             | Service                                       | A subset of Angular's `Location` API adjusted to the Angular feature module under test.                                        |
| `SpectacularFeatureRouter`               | Service                                       | A subset og Angular's `Router` API adjusted to the Angular feature module under test.                                          |

## Pipe testing

### Public API

| Export name                | Kind                             | Description                                                                                                        |
| -------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `createPipeHarness`        | `SpectacularPipeHarness` factory | Create a test harness for the specified Angular pipe. Test it by updating the value and reading the rendered test. |
| `CreatePipeHarnessOptions` | Options for `createPipeHarness`  | Angular pipe test harness options.                                                                                 |
| `SpectacularPipeHarness`   | Interface                        | A test harness for an Angular pipe. Includes an API to write a value and read the rendered text.                   |
