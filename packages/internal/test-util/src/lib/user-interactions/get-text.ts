import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const getText =
  <TComponent>(fixture: ComponentFixture<TComponent>) =>
  (query: string): string => {
    const debugElement = fixture.debugElement.query(By.css(query));
    const element: Element = debugElement.nativeElement;

    if (!element) {
      throw new Error(`No element matching query "${query}" found.`);
    }

    return element.textContent?.trim() ?? '';
  };
