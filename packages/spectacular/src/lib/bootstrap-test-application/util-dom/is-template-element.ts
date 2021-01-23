export function isTemplateElement(node: Node): node is HTMLTemplateElement {
  return 'content' in node;
}
