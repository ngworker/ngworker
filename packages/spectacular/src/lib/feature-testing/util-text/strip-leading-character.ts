export function stripLeadingCharacter(character: string, text: string): string {
  return text.replace(new RegExp('^' + character), '');
}
