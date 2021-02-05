export function stripLeadingCharacter(
  leadingCharacter: string,
  text: string
): string {
  while (text.substr(0, 1) === leadingCharacter) {
    text = text.substr(1);
  }

  return text;
}
