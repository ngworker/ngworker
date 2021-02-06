export function stripLeadingCharacters(
  leadingCharacters: string,
  text: string
): string {
  const leadingCharacterCount = leadingCharacters.length;

  while (text.substr(0, leadingCharacterCount) === leadingCharacters) {
    text = text.substr(leadingCharacterCount);
  }

  return text;
}
