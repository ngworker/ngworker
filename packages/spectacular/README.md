# Spectacular

## @ngworker/spectacular

> Spectacular Angular testing.

### Pipe test harness

#### Public API

| Export name                    | Kind                                 | Description                                                                                                        |
| ------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `createPipeTestHarness`        | `PipeTestHarness` factory.           | Create a test harness for the specified Angular pipe. Test it by updating the value and reading the rendered test. |
| `CreatePipeTestHarnessOptions` | Options for `createPipeTestHarness`. | Angular pipe test harness options.                                                                                 |
| `PipeTestHarness`              | Interface                            | A test harness for an Angular pipe. Includes an API to write a value and read the rendered text.                   |
