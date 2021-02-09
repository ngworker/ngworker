import { Location } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { featurePathToken } from '../configuration/feature-path.token';
import { ensureLeadingCharacter } from '../util-text/ensure-leading-character';
import { trimLeadingText } from '../util-text/trim-leading-text';
import { relativeFeatureUrlPrefix } from './relative-feature-url-prefix';

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
    const strippedPath = trimLeadingText('/' + this.featurePath, path);
    const isOutsideFeature = strippedPath === path;

    if (isOutsideFeature) {
      return path;
    }

    return ensureLeadingCharacter(relativeFeatureUrlPrefix, strippedPath);
  }
}
