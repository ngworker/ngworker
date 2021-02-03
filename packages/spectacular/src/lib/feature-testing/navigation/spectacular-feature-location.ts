import { Location } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { featurePathToken } from '../configuration/feature-path.token';
import { stripLeadingCharacter } from '../util-text/strip-leading-character';

@Injectable({
  providedIn: 'root',
})
export class SpectacularFeatureLocation {
  constructor(
    @Inject(featurePathToken) private readonly featurePath: string,
    private readonly location: Location
  ) {}

  path(): string {
    const path = this.location.path();

    return path === '/'
      ? path
      : stripLeadingCharacter(
          '/',
          stripLeadingCharacter('/' + this.featurePath, path)
        );
  }
}
