import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Loads KEY=value pairs from .env into process.env (does not overwrite existing vars).
 */
export function loadEnv(cwd = process.cwd()) {
  const envPath = resolve(cwd, '.env');
  let envFile;

  try {
    envFile = readFileSync(envPath, 'utf8');
  } catch {
    throw new Error('Missing .env — copy example.env and fill in your registry tokens.');
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
    if (key && process.env[key] == null) {
      process.env[key] = value;
    }
  }
}
