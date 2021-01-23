const leftMouseButton = 0;

export function createLeftMouseClick(): MouseEvent {
  return new MouseEvent('click', { button: leftMouseButton });
}
