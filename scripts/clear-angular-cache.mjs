#!/usr/bin/env node
import { rmSync } from 'node:fs';
import { resolve } from 'node:path';

const cacheDir = resolve(process.cwd(), '.angular/cache');

try {
  rmSync(cacheDir, { recursive: true, force: true });
  console.log('→ Cleared .angular/cache (Vite dependency prebundle)');
} catch (error) {
  console.warn('Could not clear .angular/cache:', error);
}
