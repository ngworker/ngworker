import { internalPipeHostTextId } from './internal-pipe-host-text-id';

export function createPipeHostTemplate(template: string): string {
  return `<span id="${internalPipeHostTextId}">${template}</span>`;
}
