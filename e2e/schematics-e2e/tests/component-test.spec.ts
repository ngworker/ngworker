import { checkFilesExist, copyNodeModules, ensureNxProject, runNxCommandAsync, uniq } from '@nrwl/nx-plugin/testing';
import * as path from 'path';

import { addPackages } from '../test-util';

describe('@ngworker/schematics:component-test generator e2e', () => {
  beforeAll(() => {
    copyNodeModules(['@schematics/angular']);
    ensureNxProject('@ngworker/schematics', 'dist/packages/schematics');
    addPackages({
      devDependencies: {
        ['@schematics/angular']: '^11.0.9',
      },
    });
  });

  beforeEach(async () => {
    componentName = uniq('component-test');
    projectName = `${componentName}-app`;
    projectPath = path.join('apps', projectName);
    await runNxCommandAsync(
      `generate @schematics/angular:application ${projectName}`
    );
    await runNxCommandAsync(
      `generate @schematics/angular:component ${componentName}`
    );
  });

  let projectName: string;
  let projectPath: string;
  let componentName: string;

  it('creates a component test suite', async done => {
    await runNxCommandAsync(
      `generate @ngworker/schematics:component-test ${componentName}`
    );
    expect(() =>
      checkFilesExist(
        `${projectPath}/src/app/${componentName}.component.spec.ts`
      )
    ).not.toThrow();
    done();
  });

  it('generates valid code', async () => {
    await runNxCommandAsync(
      `generate @ngworker/schematics:component-test ${componentName}`
    );

    const result = await runNxCommandAsync(`test ${projectName}`);
    expect(result.stdout).toContain('Executor ran');
  });

  describe('--directory', () => {
    it('creates a component test suite in the specified directory', async () => {
      const directoryName = 'feature';

      await runNxCommandAsync(
        `generate @ngworker/schematics:component-test ${componentName} --directory ${directoryName}`
      );

      expect(() =>
        checkFilesExist(
          `${projectPath}/src/app/${directoryName}/${componentName}.component.spec.ts`
        )
      ).not.toThrow();
    });
  });
});
