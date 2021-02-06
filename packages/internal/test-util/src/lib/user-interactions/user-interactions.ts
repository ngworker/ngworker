export interface UserInteractions {
  advance(): Promise<void>;
  clickButton(label: string): void;
  enterText(text: string, query: string): void;
  getText(query: string): string;
}
