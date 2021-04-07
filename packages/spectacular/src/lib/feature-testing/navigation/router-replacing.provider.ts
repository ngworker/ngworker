import { Location } from '@angular/common';
import { Compiler, FactoryProvider, Injector, NgModuleFactoryLoader, NgZone, Optional } from '@angular/core';
import {
  ChildrenOutletContexts,
  ExtraOptions,
  Route,
  Router,
  ROUTER_CONFIGURATION,
  ROUTES,
  UrlHandlingStrategy,
  UrlSerializer,
} from '@angular/router';

import { featurePathToken } from '../configuration/feature-path.token';
import { SpectacularFeatureRouter } from './spectacular-feature-router';

function assignExtraOptionsToRouter(opts: ExtraOptions, router: Router): void {
  if (opts.errorHandler) {
    router.errorHandler = opts.errorHandler;
  }

  if (opts.malformedUriErrorHandler) {
    router.malformedUriErrorHandler = opts.malformedUriErrorHandler;
  }

  if (opts.onSameUrlNavigation) {
    router.onSameUrlNavigation = opts.onSameUrlNavigation;
  }

  if (opts.paramsInheritanceStrategy) {
    router.paramsInheritanceStrategy = opts.paramsInheritanceStrategy;
  }

  if (opts.relativeLinkResolution) {
    router.relativeLinkResolution = opts.relativeLinkResolution;
  }

  if (opts.urlUpdateStrategy) {
    router.urlUpdateStrategy = opts.urlUpdateStrategy;
  }
}

function isUrlHandlingStrategy(
  opts: ExtraOptions | UrlHandlingStrategy
): opts is UrlHandlingStrategy {
  // This property check is needed because UrlHandlingStrategy is an interface and doesn't exist at
  // runtime.
  return 'shouldProcessUrl' in opts;
}

/**
 * Flattens single-level nested arrays.
 */
function flatten<T>(arr: T[][]): T[] {
  return Array.prototype.concat.apply([], arr);
}

function setupTestingRouter(
  urlSerializer: UrlSerializer,
  contexts: ChildrenOutletContexts,
  location: Location,
  loader: NgModuleFactoryLoader,
  compiler: Compiler,
  injector: Injector,
  routes: Route[][],
  opts?: ExtraOptions,
  urlHandlingStrategy?: UrlHandlingStrategy
): Router {
  const router = new Router(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    null!,
    urlSerializer,
    contexts,
    location,
    injector,
    loader,
    compiler,
    flatten(routes)
  );

  if (opts) {
    // Handle deprecated argument ordering.
    if (isUrlHandlingStrategy(opts)) {
      router.urlHandlingStrategy = opts;
    } else {
      // Handle ExtraOptions
      assignExtraOptionsToRouter(opts, router);
    }
  }

  if (urlHandlingStrategy) {
    router.urlHandlingStrategy = urlHandlingStrategy;
  }

  return router;
}

function featureRouterFactory(
  featurePath: string,
  ngZone: NgZone,
  urlSerializer: UrlSerializer,
  contexts: ChildrenOutletContexts,
  location: Location,
  loader: NgModuleFactoryLoader,
  compiler: Compiler,
  injector: Injector,
  routes: Route[][],
  opts?: ExtraOptions,
  urlHandlingStrategy?: UrlHandlingStrategy
): SpectacularFeatureRouter {
  const router = setupTestingRouter(
    urlSerializer,
    contexts,
    location,
    loader,
    compiler,
    injector,
    routes,
    opts,
    urlHandlingStrategy
  );

  return new SpectacularFeatureRouter(featurePath, router, ngZone);
}

const featureRouterDeps = [
  featurePathToken,
  NgZone,
  UrlSerializer,
  ChildrenOutletContexts,
  Location,
  NgModuleFactoryLoader,
  Compiler,
  Injector,
  ROUTES,
  ROUTER_CONFIGURATION,
  [UrlHandlingStrategy, new Optional()],
];

export const routerReplacingProvider: FactoryProvider = {
  deps: featureRouterDeps,
  provide: Router,
  useFactory: featureRouterFactory,
};
