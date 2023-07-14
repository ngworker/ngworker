import { Inject, Injectable, NgZone } from '@angular/core';
import type { NavigationExtras, UrlTree } from '@angular/router';
import { Router, UrlSegment } from '@angular/router';
import { featurePathToken } from '../configuration/feature-path.token';
import { ensureLeadingCharacter } from '../util-text/ensure-leading-character';
import { relativeFeatureUrlPrefix } from './relative-feature-url-prefix';

/**
 * A subset of Angular's `Router` server adjusted to the Angular feature module
 * under test.
 */
@Injectable()
export class SpectacularFeatureRouter {
  readonly #featurePath: string;
  readonly #router: Router;
  readonly #ngZone: NgZone;

  constructor(
    @Inject(featurePathToken) featurePath: string,
    router: Router,
    ngZone: NgZone
  ) {
    this.#featurePath = featurePath;
    this.#router = router;
    this.#ngZone = ngZone;
  }

  /**
   * Navigate based on the provided array of commands and a starting point. If
   * no starting route is provided, the navigation is absolute.
   *
   * If the first command is a tilde (`~`), the navigation is relative to the
   * feature under test.
   *
   * Wraps `Router#navigate`.
   *
   * @param commands An array of URL fragments with which to construct the
   *   target URL. If the path is static, can be the literal URL string. For a
   *   dynamic path, pass an array of path segments, followed by the parameters
   *   for each segment. The fragments are applied to the current URL or the one
   *   provided in the relativeTo property of the options object, if supplied.
   *   If the first command is a tilde (`~`), the navigation is relative to the
   *   feature under test.
   * @param extras An options object that determines how the URL should be
   *   constructed or interpreted. Optional. Default is `{ skipLocationChange: false }`.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    const [head, ...tail] = commands;

    if (head === relativeFeatureUrlPrefix) {
      commands = [this.#featurePath, ...tail];
    }

    return this.#ngZone.run(() => this.#router.navigate(commands, extras));
  }

  /**
   * Navigates to a view using an absolute route path.
   *
   * If the URL is prefixed with tilde (`~`), the navigation is relative to the
   * feature under test.
   *
   * Wraps `Router#navigateByUrl`.
   *
   * @param url An absolute path for a defined route. The function does not
   *   apply any delta to the current URL. If the URL is prefixed with tilde
   *   (`~`), the navigation is relative to the feature under test.
   * @param extras An object containing properties that modify the navigation
   *   strategy. Optional. Default is `{ skipLocationChange: false }`.
   */
  navigateByUrl(
    url: string | UrlTree,
    extras?: NavigationExtras
  ): Promise<boolean> {
    if (typeof url !== 'string') {
      // url is UrlTree

      const isRelativeFeatureUrlTree =
        url.root.children['primary']?.segments[0].path === '~';

      if (isRelativeFeatureUrlTree) {
        const [, ...tail] = url.root.children['primary'].segments;
        const featureSegment = new UrlSegment(this.#featurePath, {});
        url.root.children['primary'].segments = [featureSegment, ...tail];
      }

      url = this.#router.serializeUrl(url);
    }

    const needle = relativeFeatureUrlPrefix + '/';

    if (url.startsWith(needle)) {
      url = url.substr(needle.length);
      url = this.#prependFeaturePath(url);
    }

    return this.#ngZone.run(() => this.#router.navigateByUrl(url, extras));
  }

  #prependFeaturePath(url: string): string {
    return (
      this.#router.serializeUrl(this.#router.parseUrl(this.#featurePath)) +
      ensureLeadingCharacter('/', url)
    );
  }
}
