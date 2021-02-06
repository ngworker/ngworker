import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const enterText = <TComponent>(
  fixture: ComponentFixture<TComponent>
) => (text: string, query: string): void => {
  const input = fixture.debugElement.query(By.css(query));
  const element = input.nativeElement as HTMLInputElement | HTMLTextAreaElement;

  if (!element) {
    throw new Error(`No text box matching query "${query}" found.`);
  }

  element.value = text;
  const enterTheText = () =>
    input.triggerEventHandler('input', { target: element });

  if (fixture.ngZone) {
    fixture.ngZone.run(enterTheText);
  } else {
    enterTheText();
  }
};
