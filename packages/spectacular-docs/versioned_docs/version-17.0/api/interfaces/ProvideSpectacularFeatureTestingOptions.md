# Interface: ProvideSpectacularFeatureTestingOptions

Defined in:
[packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts:13](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts#L13)

Options for
[provideSpectacularFeatureTesting](../functions/provideSpectacularFeatureTesting.md).

## Properties

### featurePath

> `readonly` **featurePath**: `string`

Defined in:
[packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts:18](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts#L18)

The path prefix used to load the routes of the specified Angular feature, for
example `'heroes'`.

---

### routes

> `readonly` **routes**: `Routes`

Defined in:
[packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts:30](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts#L30)

One or more feature routes to load.

NOTE! It is unnecessary to lazy-load feature modules in tests, so we can
statically return an Angular module from the `loadChildren` callback.

#### Example

```typescript
[{ path: 'heroes', loadChildren: () => HeroesModule }];
```
