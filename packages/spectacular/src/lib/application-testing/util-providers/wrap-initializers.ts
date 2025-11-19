import {
  APP_BOOTSTRAP_LISTENER,
  APP_INITIALIZER,
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  Injector,
  PLATFORM_INITIALIZER,
  Provider,
  runInInjectionContext,
  StaticProvider,
} from '@angular/core';

type InitializerToken =
  | typeof APP_INITIALIZER
  | typeof APP_BOOTSTRAP_LISTENER
  | typeof ENVIRONMENT_INITIALIZER
  | typeof PLATFORM_INITIALIZER;

const INITIALIZER_TOKENS: InitializerToken[] = [
  APP_INITIALIZER,
  APP_BOOTSTRAP_LISTENER,
  ENVIRONMENT_INITIALIZER,
  PLATFORM_INITIALIZER,
];

/**
 * Check if a provider is for one of the initializer tokens.
 */
function isInitializerProvider(
  provider: Provider | EnvironmentProviders,
): provider is StaticProvider {
  if (typeof provider === 'object' && provider !== null && 'provide' in provider) {
    return INITIALIZER_TOKENS.includes(provider.provide as InitializerToken);
  }
  return false;
}

/**
 * Wrap initializer providers to ensure their callbacks run in an injection context.
 * This enables the use of inject() within initializer callback functions.
 */
export function wrapInitializerProviders(
  providers: (Provider | EnvironmentProviders)[],
): (Provider | EnvironmentProviders)[] {
  return providers.map(provider => {
    if (!isInitializerProvider(provider)) {
      return provider;
    }

    // Handle useValue provider - convert to useFactory to get injection context
    if ('useValue' in provider && typeof provider.useValue === 'function') {
      const originalFn = provider.useValue;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { useValue, ...restProvider } = provider;
      return {
        ...restProvider,
        useFactory: () => {
          const injector = inject(Injector);
          return (...args: unknown[]) => {
            return runInInjectionContext(injector, () => originalFn(...args));
          };
        },
      };
    }

    // Handle useFactory provider - wrap the returned function
    if ('useFactory' in provider && typeof provider.useFactory === 'function') {
      const originalFactory = provider.useFactory;
      return {
        ...provider,
        useFactory: (...args: unknown[]) => {
          // Get injector in the factory context (where inject() works)
          const injector = inject(Injector);
          const result = originalFactory(...args);
          // If the factory returns a function, wrap it to run in injection context
          if (typeof result === 'function') {
            return (...callbackArgs: unknown[]) => {
              return runInInjectionContext(injector, () =>
                result(...callbackArgs)
              );
            };
          }
          return result;
        },
      };
    }

    return provider;
  });
}
