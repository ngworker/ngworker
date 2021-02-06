import { ComponentFixture } from '@angular/core/testing';

import { clickButton } from './click-button';
import { enterText } from './enter-text';
import { getText } from './get-text';

export function createUserInteractions<TComponent>(
  fixture: ComponentFixture<TComponent>
) {
  return {
    clickButton: clickButton(fixture),
    enterText: enterText(fixture),
    getText: getText(fixture),
  };
}
