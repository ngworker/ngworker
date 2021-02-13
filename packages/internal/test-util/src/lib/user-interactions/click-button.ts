import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { createLeftMouseClick } from './util-dom/create-left-mouse-click';

export const clickButton = <TComponent>(
  fixture: ComponentFixture<TComponent>
) => (label: string): void => {
  const button = fixture.debugElement
    .queryAll(By.css('button'))
    .find(b => b.nativeElement.textContent.trim() === label);

  if (!button) {
    throw new Error(`No button with label "${label}" found.`);
  }

  const buttonElement: HTMLButtonElement = button.nativeElement;
  const leftClick = () => buttonElement.dispatchEvent(createLeftMouseClick());

  if (fixture.ngZone) {
    fixture.ngZone.run(leftClick);
  } else {
    leftClick();
  }
};
