import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

/**
 * Wrap the specified HTML in a template.
 *
 * @param html The markup to embed in the template.
 * @returns The template wrapping the specified markup.
 */
export function createTemplate(html: string): HTMLElement {
  const doc = TestBed.inject(DOCUMENT);

  const templateElement = doc.createElement('template');
  templateElement.innerHTML = html;

  return templateElement;
}
