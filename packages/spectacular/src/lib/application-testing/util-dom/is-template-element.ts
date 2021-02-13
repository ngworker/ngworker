/**
 * Detects whether the specified DOM node is a template element.
 *
 * @param node The potential template element.
 * @returns `true` if the specified DOM node is a template element, otherwise
 *   `false`.
 */
export function isTemplateElement(node: Node): node is HTMLTemplateElement {
  return 'content' in node;
}
