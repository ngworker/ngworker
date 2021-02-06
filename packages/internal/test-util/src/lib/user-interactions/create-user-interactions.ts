import { ComponentFixture } from '@angular/core/testing';

import { clickButton } from './click-button';
import { enterText } from './enter-text';
import { getText } from './get-text';
import { UserInteractions } from './user-interactions';

export function createUserInteractions<TComponent>(
  fixture: ComponentFixture<TComponent>
): UserInteractions {
  return {
    async advance(): Promise<void> {
      await fixture.whenStable();
      fixture.detectChanges();
    },
    clickButton: clickButton(fixture),
    enterText: enterText(fixture),
    getText: getText(fixture),
  };
}
