import { createRootElement } from './create-root-element';
import { replaceRootElement } from './replace-root-element';

export function ensureRootElement(tagName: string): void {
  const rootElement = createRootElement(tagName);
  replaceRootElement(rootElement);
}
