# Spectacular

## @ngworker/spectacular

> Spectacular Angular testing.

## Application testing

### Public API

| Export name                              | Kind                                           | Description                                                                                                                                                |
| ---------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bootstrapSpectacularApplication`        | Side effect                                    | Bootstrap a test application with the specified metadata. Useful to test configuration Angular modules, bootstrap listeners, and application initializers. |
| `BootstrapspectacularApplicationOptions` | Options for `bootstrapSpectacularApplication`. | Spectacular application options.                                                                                                                           |
| `SpectacularAppComponent`                | Bootstrapped component.                        | A root component for testing.                                                                                                                              |

### Feature testing

#### Public API

| Export name | Kind | Description |
| ----------- | ---- | ----------- |

<!--
| `createFeatureTestHarness`        | `FeatureHarness` factory.               | Create a test harness for the specified Angular feature module. Test as-a-user by navigating, clicking, entering text, querying text and asserting the URL. |
| `CreateFeatureTestHarnessOptions` | Options for `createFeatureTestHarness`. | Feature test harness options.                                                                                                                               |
| `FeatureTestHarness`              | Interface                               | A test harness for an Angular feature module. Includes an API to test as-a-user.                                                                            |
-->

## Pipe test harness

### Public API

| Export name                    | Kind                                 | Description                                                                                                        |
| ------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `createPipeTestHarness`        | `PipeTestHarness` factory.           | Create a test harness for the specified Angular pipe. Test it by updating the value and reading the rendered test. |
| `CreatePipeTestHarnessOptions` | Options for `createPipeTestHarness`. | Angular pipe test harness options.                                                                                 |
| `PipeTestHarness`              | Interface                            | A test harness for an Angular pipe. Includes an API to write a value and read the rendered text.                   |
