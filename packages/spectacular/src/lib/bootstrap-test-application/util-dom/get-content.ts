import { isTemplateElement } from './is-template-element';

export function getContent(node: Node): Node {
  return isTemplateElement(node) ? node.content : node;
}
