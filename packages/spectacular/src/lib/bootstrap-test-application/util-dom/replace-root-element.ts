import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { detach } from './detach';

export function replaceRootElement(newRootElement: HTMLElement): void {
  const doc = TestBed.inject(DOCUMENT);
  doc
    .querySelectorAll(newRootElement.tagName)
    .forEach(oldRootElement => detach(oldRootElement));
  doc.body.appendChild(newRootElement);
}
