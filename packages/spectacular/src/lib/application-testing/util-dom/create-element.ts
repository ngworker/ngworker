import { createTemplate } from './create-template';
import { getContent } from './get-content';

/**
 * Create an element with the specified tag name.
 *
 * @param tagName The tag name of the element to create.
 */
export function createElement(tagName: string): HTMLElement {
  return getContent(createTemplate(`<${tagName}></${tagName}>`))
    .firstChild as HTMLElement;
}
