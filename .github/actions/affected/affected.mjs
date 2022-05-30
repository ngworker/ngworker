import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

function readAffectedApps(base) {
  const affected = execSync(`pnpx nx affected:apps --plain --base=${base}`, {
    encoding: 'utf-8',
  });

  return sanitizeAffectedOutput(affected);
}

function readAffectedLibs(base) {
  const affected = execSync(`pnpx nx affected:libs --plain --base=${base}`, {
    encoding: 'utf-8',
  });

  return sanitizeAffectedOutput(affected);
}

function readAffectedProjects(base) {
  const affectedApps = readAffectedApps(base);
  const affectedLibs = readAffectedLibs(base);

  return affectedApps.concat(affectedLibs);
}

function sanitizeAffectedOutput(affectedOutput) {
  return affectedOutput
    .trim()
    .split(' ')
    .filter(project => project !== '');
}

function validateProjectParameter(projectName) {
  if (!projectName) {
    console.error('No project argument passed.');

    process.exit(1);
  }

  const workspacePath = path.resolve(__dirname, '../../../workspace.json');
  const workspace = JSON.parse(readFileSync(workspacePath).toString());
  const isProjectFound = workspace.projects[projectName] !== undefined;

  if (!isProjectFound) {
    console.error(
      `"${projectName}" is not the name of a project in this workspace.`
    );

    process.exit(1);
  }
}

// Not available in an ES Module as of Node.js 12.x
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [, , project, base] = process.argv[2];

validateProjectParameter(project);

const affectedProjects = readAffectedProjects(base);
const isAffected = affectedProjects.includes(project);

console.log(isAffected);