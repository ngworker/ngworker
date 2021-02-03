import { Inject, Injectable, NgZone } from '@angular/core';
import { NavigationExtras, Router, UrlTree } from '@angular/router';

import { featurePathToken } from '../configuration/feature-path.token';
import { ensureLeadingCharacter } from '../util-text/ensure-leading-character';

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
    commands = [this.featurePath, ...commands];

    return this.ngZone.run(() => this.router.navigate(commands, extras));
  }

  navigateByUrl(
    url: string | UrlTree,
    extras?: NavigationExtras
  ): Promise<boolean> {
    if (typeof url !== 'string') {
      url = this.router.serializeUrl(url);
    }

    url = this.prependFeaturePath(url);

    return this.ngZone.run(() => this.router.navigateByUrl(url, extras));
  }

  private prependFeaturePath(url: string): string {
    return (
      this.router.serializeUrl(this.router.parseUrl(this.featurePath)) +
      ensureLeadingCharacter('/', url)
    );
  }
}
