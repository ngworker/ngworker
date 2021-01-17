import { isTemplateElement } from './is-template-element';

export function getContent(node: Node): Node {
  if (isTemplateElement(node)) {
    return node.content;
  } else {
    return node;
  }
}
