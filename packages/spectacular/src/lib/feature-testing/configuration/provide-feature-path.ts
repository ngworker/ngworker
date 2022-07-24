import { Provider } from '@angular/core';
import { featurePathToken } from './feature-path.token';

export function provideFeaturePath(featurePath: string): Provider {
  return {
    provide: featurePathToken,
    useValue: featurePath,
  };
}
