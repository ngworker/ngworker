import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

export function createTemplate(html: string): HTMLElement {
  const doc = TestBed.inject(DOCUMENT);
  const templateElement = doc.createElement('template');
  templateElement.innerHTML = html;

  return templateElement;
}
