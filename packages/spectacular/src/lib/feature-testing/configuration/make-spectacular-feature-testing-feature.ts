import type { Provider } from '@angular/core';
import type {
  SpectacularFeatureTestingFeature,
  SpectacularFeatureTestingFeatureKind,
} from './spectacular-feature-testing-features';

export function makeSpectacularFeatureTestingFeature<
  TFeatureKind extends SpectacularFeatureTestingFeatureKind,
>(
  kind: TFeatureKind,
  providers: Provider[]
): SpectacularFeatureTestingFeature<TFeatureKind> {
  return {
    ɵbrand: 'SpectacularFeatureTestingFeature',
    ɵkind: kind,
    ɵproviders: providers,
  };
}
