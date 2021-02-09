# Spectacular

## @ngworker/spectacular

> Spectacular Angular testing.

## Application testing

### Public API

| Export name                              | Kind                                          | Description                                                                                                                                                |
| ---------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bootstrapSpectacularApplication`        | Side effect                                   | Bootstrap a test application with the specified metadata. Useful to test configuration Angular modules, bootstrap listeners, and application initializers. |
| `BootstrapspectacularApplicationOptions` | Options for `bootstrapSpectacularApplication` | Spectacular application options.                                                                                                                           |
| `SpectacularAppComponent`                | Bootstrapped component                        | A root component for testing.                                                                                                                              |

### Feature testing

#### Public API

| Export name                              | Kind                                                  | Description                                                                                                                    |
| ---------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `SpectacularFeatureTestingModuleOptions` | Options for `SpectacularFeatureTestingModule`         | Feature testing options for `SpectacularFeatureTestingModule.withFeature`.                                                     |
| `SpectacularFeatureTestingModule`        | Angular testing configuration module                  | Configures the `RouterTestingModule` and provides Spectactular services for testing feature modules.                           |
| `SpectacularFeatureLocation`             | Service                                               | A subset of Angular's `Location` API adjusted to the Angular feature module under test.                                        |
| `SpectacularFeatureRouter`               | Service                                               | A subset og Angular's `Router` API adjusted to the Angular feature module under test.                                          |
| `SpectacularFeatureTestbed`              | Platform-level singleton service                      | Configures `SpectacularFeatureTestingModule`, bootstraps `SpectacularAppComponent` and navigates to the default feature route. |
| `SpectacularCreateFeatureOptions`        | Options for `SpectacularFeatureTestbed.createFeature` | Testbed feature testing options.                                                                                               |

## Pipe test harness

### Public API

| Export name                    | Kind                                | Description                                                                                                        |
| ------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `createPipeTestHarness`        | `PipeTestHarness` factory           | Create a test harness for the specified Angular pipe. Test it by updating the value and reading the rendered test. |
| `CreatePipeTestHarnessOptions` | Options for `createPipeTestHarness` | Angular pipe test harness options.                                                                                 |
| `PipeTestHarness`              | Interface                           | A test harness for an Angular pipe. Includes an API to write a value and read the rendered text.                   |
