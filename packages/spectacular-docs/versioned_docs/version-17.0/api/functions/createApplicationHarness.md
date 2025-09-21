# Function: createApplicationHarness()

> **createApplicationHarness**(`options`): `Promise`\<[`SpectacularApplicationHarness`](../interfaces/SpectacularApplicationHarness.md)\>

Defined in: [packages/spectacular/src/lib/application-testing/application-harness/create-application-harness.ts:26](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/application-testing/application-harness/create-application-harness.ts#L26)

Bootstrap a test application with the specified metadata. Useful to test configuration Angular modules, bootstrap listeners, and application initializers.

## Parameters

### options

[`CreateApplicationHarnessOptions`](../type-aliases/CreateApplicationHarnessOptions.md) = `{}`

## Returns

`Promise`\<[`SpectacularApplicationHarness`](../interfaces/SpectacularApplicationHarness.md)\>
