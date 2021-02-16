import { createElement } from './create-element';
import { replaceRootElement } from './replace-root-element';

/**
 * Make sure that we have a new root element attached to the DOM.
 *
 * @param tagName The tag name of the element to create and attach.
 */
export function ensureFreshRootElement(tagName: string): void {
  const rootElement = createElement(tagName);

  replaceRootElement(rootElement);
}
