/**
 * Detach the specified DOM node from any document or document fragment it's
 * attached to.
 *
 * @param node The DOM node to detach.
 */
export function detach(node: Node): void {
  node.parentNode?.removeChild(node);
}
