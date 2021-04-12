import { NxJsonConfiguration } from '@nrwl/devkit';

import { updateJsonFile } from './update-json-file';

/**
 * Configure the default base branch for Nx.
 *
 * @param defaultBaseBranch Default base branch used by nx affected commands.
 */
export function useDefaultBaseBranch(defaultBaseBranch: string): void {
  updateJsonFile<NxJsonConfiguration>('nx.json', nxJson => ({
    ...nxJson,
    affected: {
      ...nxJson.affected,
      defaultBase: defaultBaseBranch,
    },
  }));
}
