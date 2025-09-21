# Interface: CreateFeatureHarnessOptions

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts:14](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts#L14)

Feature harness options.

## Extends

- `Pick`\<`NgModule`, `"imports"` \| `"providers"`\>

## Properties

### featurePath

> `readonly` **featurePath**: `string`

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts:20](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts#L20)

The route path used to load the routes of the specified Angular feature module, for example `'heroes'`.

---

### imports?

> `optional` **imports**: (`any`[] \| `Type`\<`any`\> \| > `ModuleWithProviders`\<\{ \}\>)[]

Defined in: node_modules/@angular/core/index.d.ts:6522

The set of NgModules whose exported [declarables](guide/glossary#declarable) are available to templates in this module.

#### Usage Notes

A template can use exported declarables from any imported module, including those from modules that are imported indirectly and re-exported. For example, `ModuleA` imports `ModuleB`, and also exports it, which makes the declarables from `ModuleB` available wherever `ModuleA` is imported.

### Example

The following example allows MainModule to use anything exported by `CommonModule`:

```javascript
@NgModule({
  imports: [CommonModule],
})
class MainModule {}
```

#### Inherited from

`Pick.imports`

---

### providers?

> `optional` **providers**: (`Provider` \| `EnvironmentProviders`)[]

Defined in: node_modules/@angular/core/index.d.ts:6467

The set of injectable objects that are available in the injector of this module.

#### See

- [Dependency Injection guide](guide/dependency-injection)
- [NgModule guide](guide/providers)

#### Usage Notes

Dependencies whose providers are listed here become available for injection into any component, directive, pipe or service that is a child of this injector. The NgModule used for bootstrapping uses the root injector, and can provide dependencies to any part of the app.

A lazy-loaded module has its own injector, typically a child of the app root injector. Lazy-loaded services are scoped to the lazy-loaded module's injector. If a lazy-loaded module also provides the `UserService`, any component created within that module's context (such as by router navigation) gets the local instance of the service, not the instance in the root injector. Components in external modules continue to receive the instance provided by their injectors.

### Example

The following example defines a class that is injected in the HelloWorld NgModule:

```
class Greeter {
   greet(name:string) {
     return 'Hello ' + name + '!';
   }
}

@NgModule({
  providers: [
    Greeter
  ]
})
class HelloWorld {
  greeter:Greeter;

  constructor(greeter:Greeter) {
    this.greeter = greeter;
  }
}
```

#### Inherited from

`Pick.providers`

---

### routerOptions?

> `readonly` `optional` **routerOptions**: `ExtraOptions`

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts:24](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts#L24)

Optional Angular `Router` options.

---

### routes

> `readonly` **routes**: `Routes`

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts:36](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts#L36)

One or more feature routes to load.

NOTE! It is unnecessary to lazy-load feature modules in tests, so we can statically return an Angular module from the `loadChildren` callback.

#### Example

```typescript
[{ path: 'heroes', loadChildren: () => HeroesModule }];
```
