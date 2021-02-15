export function ensureLeadingCharacter(
  leadingCharacter: string,
  text: string
): string {
  if (text === '') {
    text = leadingCharacter;
  } else if (text.substr(0, 1) !== leadingCharacter) {
    text = leadingCharacter + text;
  }

  return text;
}
