import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { detach } from './detach';

/**
 * Detach all instances sharing the tag name of the sepcified element from the
 * DOM, then attach the specified element.
 *
 * @param newRootElement The root element to attach.
 */
export function replaceRootElement(newRootElement: HTMLElement): void {
  const doc = TestBed.runInInjectionContext(() => TestBed.inject(DOCUMENT));

  doc
    .querySelectorAll(newRootElement.tagName)
    .forEach(oldRootElement => detach(oldRootElement));
  doc.body.appendChild(newRootElement);
}
