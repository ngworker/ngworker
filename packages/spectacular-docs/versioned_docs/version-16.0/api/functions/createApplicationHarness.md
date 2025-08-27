# Function: createApplicationHarness()

> **createApplicationHarness**(`options`):
> `Promise`\<[`SpectacularApplicationHarness`](../interfaces/SpectacularApplicationHarness.md)\>

Defined in:
[packages/spectacular/src/lib/application-testing/application-harness/create-application-harness.ts:25](https://github.com/ngworker/ngworker/blob/4a580b5176b1892ec2d5ec97271081f045c32c3a/packages/spectacular/src/lib/application-testing/application-harness/create-application-harness.ts#L25)

Bootstrap a test application with the specified metadata. Useful to test
configuration Angular modules, bootstrap listeners, and application
initializers.

## Parameters

### options

[`CreateApplicationHarnessOptions`](../type-aliases/CreateApplicationHarnessOptions.md)
= `{}`

## Returns

`Promise`\<[`SpectacularApplicationHarness`](../interfaces/SpectacularApplicationHarness.md)\>
