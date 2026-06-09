#!/usr/bin/env node
/**
 * Loads .env into process.env and runs npm install.
 * For local development only — not supported inside StackBlitz WebContainers.
 */
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const envPath = resolve(process.cwd(), '.env');

function isStackBlitz() {
  return (
    process.versions.webcontainer != null ||
    process.env.STACKBLITZ === '1' ||
    process.env.SHELL?.includes('jsh') === true
  );
}

if (isStackBlitz()) {
  console.error(`
install:with-registry is for local development only.

StackBlitz WebContainers cannot install private packages from custom registries
(@atomchat-io/* on npmjs and @fortawesome/pro-* on npm.fontawesome.com).
Nested "npm install" inside StackBlitz often fails with EIO / cache errors — this
is a platform limitation, not a project bug.

What to do instead:

  1. Local dev (recommended)
     cp example.env .env   # add your tokens
     npm run install:with-registry
     npm start

  2. StackBlitz Teams / Enterprise
     Configure private npm registries in workspace settings:
     https://developer.stackblitz.com/teams/private-npm-registry-integration
     Do NOT run install:with-registry — deps install when the project opens.

  3. Share a deployed build (Netlify, etc.) instead of a StackBlitz link.

See README.md → "StackBlitz" for details.
`);
  process.exit(1);
}

let envFile;
try {
  envFile = readFileSync(envPath, 'utf8');
} catch {
  console.error('Missing .env — copy example.env and fill in your registry tokens.');
  process.exit(1);
}

for (const line of envFile.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) {
    continue;
  }
  const separator = trimmed.indexOf('=');
  if (separator === -1) {
    continue;
  }
  const key = trimmed.slice(0, separator).trim();
  let value = trimmed.slice(separator + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  if (key) {
    process.env[key] = value;
  }
}

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const userArgs = process.argv.slice(2);
const args = ['install', ...userArgs];

const result = spawnSync(npmCmd, args, {
  stdio: 'inherit',
  env: process.env,
  shell: process.platform === 'win32',
});

if ((result.status ?? 1) !== 0) {
  console.error(`
npm install failed.

If the error mentions EIO or "not found in cache", clear npm's cache and retry:
  npm cache clean --force
  npm run install:with-registry
`);
}

process.exit(result.status ?? 1);
