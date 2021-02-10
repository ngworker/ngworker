export interface UserInteractions {
  clickButton(label: string): void;
  enterText(text: string, query: string): void;
  getText(query: string): string;
}
