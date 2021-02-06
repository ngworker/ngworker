import { Inject, Injectable, NgZone } from '@angular/core';
import { NavigationExtras, Router, UrlSegment, UrlTree } from '@angular/router';

import { featurePathToken } from '../configuration/feature-path.token';
import { ensureLeadingCharacter } from '../util-text/ensure-leading-character';
import { relativeFeatureUrlPrefix } from './relative-feature-url-prefix';

@Injectable({
  providedIn: 'root',
})
export class SpectacularFeatureRouter {
  constructor(
    @Inject(featurePathToken) private readonly featurePath: string,
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    const [head, ...tail] = commands;

    if (head === relativeFeatureUrlPrefix) {
      commands = [this.featurePath, ...tail];
    }

    return this.ngZone.run(() => this.router.navigate(commands, extras));
  }

  navigateByUrl(
    url: string | UrlTree,
    extras?: NavigationExtras
  ): Promise<boolean> {
    if (typeof url !== 'string') {
      // url is UrlTree

      const isRelativeFeatureUrlTree =
        url.root.children.primary?.segments[0].path === '~';

      if (isRelativeFeatureUrlTree) {
        const [, ...tail] = url.root.children.primary.segments;
        const featureSegment = new UrlSegment(this.featurePath, {});
        url.root.children.primary.segments = [featureSegment, ...tail];
      }

      url = this.router.serializeUrl(url);
    }

    const needle = relativeFeatureUrlPrefix + '/';

    if (url.startsWith(needle)) {
      url = url.substr(needle.length);
      url = this.prependFeaturePath(url);
    }

    return this.ngZone.run(() => this.router.navigateByUrl(url, extras));
  }

  private prependFeaturePath(url: string): string {
    return (
      this.router.serializeUrl(this.router.parseUrl(this.featurePath)) +
      ensureLeadingCharacter('/', url)
    );
  }
}
