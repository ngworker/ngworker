import { isTemplateElement } from './is-template-element';

/**
 * Extract the DOM elements from the specified DOM node. If it's a template,
 * extract its DOM fragment.
 *
 * @param node The DOM node whose DOM elements to extract.
 * @returns The DOM elements of the specified DOM node.
 */
export function getContent(node: Node): Node {
  return isTemplateElement(node) ? node.content : node;
}
