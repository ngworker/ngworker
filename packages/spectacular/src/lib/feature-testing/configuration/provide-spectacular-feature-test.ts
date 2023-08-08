import type { EnvironmentProviders, Provider } from '@angular/core';
import type { RouterFeatures } from '@angular/router';
import type { ProvideSpectacularFeatureTestingOptions } from './provide-spectacular-feature-testing';
import { provideSpectacularFeatureTesting } from './provide-spectacular-feature-testing';
import type { SpectacularFeatureTestingFeatures } from './spectacular-feature-testing-features';

/**
 * Options for {@link provideSpectacularFeatureTest}.
 *
 * @deprecated Deprecated in favor of {@link ProvideSpectacularFeatureTestingOptions}.
 *   To be removed in Spectacular 16.0.
 */
// Resolve @typescript-eslint/no-empty-interface: An interface is used to prevent
//   documentation inheritance in the API reference.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProvideSpectacularFeatureTestOptions
  extends ProvideSpectacularFeatureTestingOptions {}

/**
 * Provide dependencies needed by the Spectacular Feature testing API.
 *
 * @deprecated Deprecated in favor of {@link provideSpectacularFeatureTesting}.
 *   To be removed in Spectacular 16.0.
 */
export function provideSpectacularFeatureTest(
  options: ProvideSpectacularFeatureTestOptions,
  ...features: (SpectacularFeatureTestingFeatures | RouterFeatures)[]
): (EnvironmentProviders | Provider)[] {
  return provideSpectacularFeatureTesting(options, ...features);
}
