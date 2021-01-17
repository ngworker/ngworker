export function ensureLeadingCharacter(
  character: string,
  text: string
): string {
  if (text === '') {
    text = character;
  } else if (text.substr(0, 1) !== character) {
    text = character + text;
  }

  return text;
}
