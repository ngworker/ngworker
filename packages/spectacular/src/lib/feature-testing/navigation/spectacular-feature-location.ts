import { Location } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { featurePathToken } from '../configuration/feature-path.token';
import { ensureLeadingCharacter } from '../util-text/ensure-leading-character';
import { trimLeadingText } from '../util-text/trim-leading-text';
import { relativeFeatureUrlPrefix } from './relative-feature-url-prefix';

/**
 * A subset of Angular's `Location` service adjusted to the Angular feature
 * module under test.
 */
@Injectable()
export class SpectacularFeatureLocation {
  readonly #featurePath: string;
  readonly #location: Location;

  constructor(
    @Inject(featurePathToken) featurePath: string,
    location: Location
  ) {
    this.#featurePath = featurePath;
    this.#location = location;
  }

  /**
   * Normalizes the URL path for this location. URLs within the Angular feature
   * module under test are prefixed with tilde (`~`).
   *
   * Wraps `Location#path`.
   *
   * @param includeHash True to include an anchor fragment in the path.
   *   Optional. Default is `false`.
   */
  path(includeHash: boolean = false): string {
    const path = this.#location.path(includeHash);
    const strippedPath = trimLeadingText('/' + this.#featurePath, path);
    const isOutsideFeature = strippedPath === path;

    if (isOutsideFeature) {
      return path;
    }

    return ensureLeadingCharacter(
      relativeFeatureUrlPrefix,
      ensureLeadingCharacter('/', strippedPath)
    );
  }
}
