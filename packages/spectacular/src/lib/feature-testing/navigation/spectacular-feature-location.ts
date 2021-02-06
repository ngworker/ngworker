import { Location } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { featurePathToken } from '../configuration/feature-path.token';
import { stripLeadingCharacters } from '../util-text/strip-leading-characters';

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
      : stripLeadingCharacters(
          '/',
          stripLeadingCharacters('/' + this.featurePath, path)
        );
  }
}
