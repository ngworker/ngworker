import { createTemplate } from './create-template';
import { getContent } from './get-content';

export function createRootElement(tagName: string): HTMLElement {
  return getContent(createTemplate(`<${tagName}></${tagName}>`))
    .firstChild as HTMLElement;
}
