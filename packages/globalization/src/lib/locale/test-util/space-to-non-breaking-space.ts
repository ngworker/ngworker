export function spaceToNonBreakingSpace(text: string): string {
  return text.replace(/ /g, '\xA0');
}
