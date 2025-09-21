# Function: withInitialFeatureNavigation()

> **withInitialFeatureNavigation**(): [`InitialFeatureNavigationFeature`](../type-aliases/InitialFeatureNavigationFeature.md)

Defined in: [packages/spectacular/src/lib/feature-testing/configuration/with-initial-feature-navigation.ts:40](https://github.com/ngworker/ngworker/blob/4a580b5176b1892ec2d5ec97271081f045c32c3a/packages/spectacular/src/lib/feature-testing/configuration/with-initial-feature-navigation.ts#L40)

Navigate to the specified feature path when the test is initialized.

## Returns

[`InitialFeatureNavigationFeature`](../type-aliases/InitialFeatureNavigationFeature.md)

## Example

```typescript
providers: [
  provideSpectacularFeatureTesting(
    {
      featurePath: 'heroes',
      routes: [
        { path: 'heroes', loadChildren: () => heroesRoutes },
      ],
    },
    withInitialFeatureNavigation(),
  ),
],
```
