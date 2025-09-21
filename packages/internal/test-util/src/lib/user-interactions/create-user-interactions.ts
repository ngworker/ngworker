import { ComponentFixture } from '@angular/core/testing';

import { clickButton } from './click-button';
import { enterText } from './enter-text';
import { getText } from './get-text';
import { UserInteractions } from './user-interactions';

export function createUserInteractions<TComponent>(
  fixture: ComponentFixture<TComponent>,
): UserInteractions {
  return {
    clickButton: clickButton(fixture),
    enterText: enterText(fixture),
    getText: getText(fixture),
  };
}
