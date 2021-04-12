import { WorkspaceRootPackageJson } from './types';
import { updateJsonFile } from './update-json-file';

export type Packages = Pick<
  WorkspaceRootPackageJson,
  'dependencies' | 'devDependencies'
>;

export function addPackages(packages: Packages): void {
  updateJsonFile('package.json', (packageJson: WorkspaceRootPackageJson) => ({
    ...packageJson,
    dependencies: {
      ...(packageJson.dependencies ?? {}),
      ...(packages.dependencies ?? {}),
    },
    devDependencies: {
      ...(packageJson.devDependencies ?? {}),
      ...(packages.devDependencies ?? {}),
    },
  }));
}
