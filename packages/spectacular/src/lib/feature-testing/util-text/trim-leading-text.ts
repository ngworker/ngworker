export function trimLeadingText(
  leadingText: string,
  originalText: string
): string {
  const leadingTextCharacterCount = leadingText.length;

  while (originalText.substr(0, leadingTextCharacterCount) === leadingText) {
    originalText = originalText.substr(leadingTextCharacterCount);
  }

  return originalText;
}
