#!/usr/bin/env node
/**
 * Loads .env into process.env and runs npm install.
 * Cross-platform — only requires Node.js (no prior npm install).
 */
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const MAX_ATTEMPTS = 3;
const envPath = resolve(process.cwd(), '.env');

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

function runInstall(attempt) {
  const args = ['install', ...userArgs];
  if (attempt > 1) {
    args.push('--prefer-online');
  }

  return spawnSync(npmCmd, args, {
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  });
}

let lastStatus = 1;

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
  if (attempt > 1) {
    console.warn(
      `\nnpm install failed (attempt ${attempt - 1}/${MAX_ATTEMPTS}), retrying with --prefer-online…\n`,
    );
  }

  const result = runInstall(attempt);
  lastStatus = result.status ?? 1;

  if (lastStatus === 0) {
    process.exit(0);
  }
}

console.error(`
npm install failed after ${MAX_ATTEMPTS} attempts.

If the error mentions EIO or "not found in cache", clear npm's cache and retry:
  npm cache clean --force
  npm run install:with-registry
`);

process.exit(lastStatus);
