export function detach(node: Node): void {
  node.parentNode?.removeChild(node);
}
