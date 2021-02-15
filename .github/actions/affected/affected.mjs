import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

function readAffectedApps() {
  const affected = execSync(`nx affected:apps --plain`, {
    encoding: 'utf-8',
    stdio: 'pipe',
  });

  return sanitizeAffectedOutput(affected);
}

function readAffectedLibs() {
  const affected = execSync(`nx affected:libs --plain`, {
    encoding: 'utf-8',
    stdio: 'pipe',
  });

  return sanitizeAffectedOutput(affected);
}

function readAffectedProjects() {
  const affectedApps = readAffectedApps();
  const affectedLibs = readAffectedLibs();

  return affectedApps.concat(affectedLibs);
}

function sanitizeAffectedOutput(affectedOutput) {
  return affectedOutput
    .trim()
    .split(' ')
    .filter(project => project !== '');
}

function validateProjectName(projectName) {
  if (!projectName) {
    throw new Error('No project argument passed.');
  }

  const workspacePath = path.resolve(__dirname, '../../../workspace.json');
  const workspace = JSON.parse(readFileSync(workspacePath).toString());
  const isProjectFound = workspace.projects[projectName] !== undefined;

  if (!isProjectFound) {
    throw new Error(
      `"${projectName}" is not the name of a project in this workspace.`
    );
  }
}

// Not available in an ES Module as of Node.js 12.x
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const project = process.argv[2];

validateProjectName(project);

const affectedProjects = readAffectedProjects();
const isAffected = affectedProjects.includes(project);

console.log(isAffected);
