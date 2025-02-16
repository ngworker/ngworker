---
id: "ProvideSpectacularFeatureTestOptions"
title: "Interface: ProvideSpectacularFeatureTestOptions"
sidebar_label: "ProvideSpectacularFeatureTestOptions"
sidebar_position: 0
custom_edit_url: null
---

Options for [provideSpectacularFeatureTest](../modules.md#providespectacularfeaturetest).

**`Deprecated`**

Deprecated in favor of [ProvideSpectacularFeatureTestingOptions](ProvideSpectacularFeatureTestingOptions.md).
  To be removed in Spectacular 16.0.

## Hierarchy

- [`ProvideSpectacularFeatureTestingOptions`](ProvideSpectacularFeatureTestingOptions.md)

  ↳ **`ProvideSpectacularFeatureTestOptions`**

## Properties

### featurePath

• `Readonly` **featurePath**: `string`

The path prefix used to load the routes of the specified Angular feature,
for example `'heroes'`.

#### Inherited from

[ProvideSpectacularFeatureTestingOptions](ProvideSpectacularFeatureTestingOptions.md).[featurePath](ProvideSpectacularFeatureTestingOptions.md#featurepath)

#### Defined in

[packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts:18](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts#L18)

___

### routes

• `Readonly` **routes**: `Routes`

One or more feature routes to load.

NOTE! It is unnecessary to lazy-load feature modules in tests, so we can
statically return an Angular module from the `loadChildren` callback.

**`Example`**

```typescript
[{ path: 'heroes', loadChildren: () => HeroesModule }]
```

#### Inherited from

[ProvideSpectacularFeatureTestingOptions](ProvideSpectacularFeatureTestingOptions.md).[routes](ProvideSpectacularFeatureTestingOptions.md#routes)

#### Defined in

[packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts:30](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts#L30)
