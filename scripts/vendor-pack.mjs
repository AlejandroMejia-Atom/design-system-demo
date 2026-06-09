#!/usr/bin/env node
/**
 * Packs private npm packages into vendor/ for StackBlitz (no private registry).
 *
 * Usage:
 *   npm run vendor:pack              # download tarballs only
 *   npm run vendor:stackblitz        # pack + switch package.json to file: deps
 *   npm run vendor:restore           # revert to registry-based install
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, join } from 'node:path';
import { loadEnv } from './load-env.mjs';

const ROOT = process.cwd();
const VENDOR_DIR = resolve(ROOT, 'vendor');
const MANIFEST_PATH = join(VENDOR_DIR, 'manifest.json');
const PACKAGE_JSON_PATH = resolve(ROOT, 'package.json');
const NPMRC_PATH = resolve(ROOT, '.npmrc');
const NPMRC_REGISTRY_PATH = resolve(ROOT, '.npmrc.registry');
const NPMRC_STACKBLITZ_PATH = resolve(ROOT, '.npmrc.stackblitz');

/** Package names that require a private registry (must be vendored for StackBlitz). */
const PRIVATE_PACKAGE_NAMES = [
  '@atomchat-io/ui-design-system',
  '@atomchat-io/ui-tokens',
  '@atomchat-io/ui-utils',
  '@fortawesome/pro-regular-svg-icons',
  '@fortawesome/pro-solid-svg-icons',
];

function isStackBlitzRuntime() {
  return (
    process.versions.webcontainer != null ||
    process.env.STACKBLITZ === '1' ||
    process.env.SHELL?.includes('jsh') === true
  );
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function npmPack(spec, destination) {
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const result = spawnSync(
    npmCmd,
    ['pack', spec, '--pack-destination', destination],
    { stdio: 'inherit', env: process.env, shell: process.platform === 'win32' },
  );
  if ((result.status ?? 1) !== 0) {
    throw new Error(`npm pack failed for ${spec}`);
  }
}

function tarballName(name, version) {
  return `${name.replace(/^@/, '').replace('/', '-')}-${version}.tgz`;
}

function resolveVersionsFromLockfile() {
  const lockPath = resolve(ROOT, 'package-lock.json');
  const lock = readJson(lockPath);
  const packages = [];

  for (const packageName of PRIVATE_PACKAGE_NAMES) {
    const lockKey = `node_modules/${packageName}`;
    const entry = lock.packages?.[lockKey];
    if (!entry?.version) {
      throw new Error(`Could not resolve ${packageName} in package-lock.json — run npm install first.`);
    }
    const range = readJson(PACKAGE_JSON_PATH).dependencies?.[packageName] ?? entry.version;
    packages.push({
      name: packageName,
      version: entry.version,
      range,
      tarball: tarballName(packageName, entry.version),
    });
  }

  return packages;
}

function packTarballs(packages) {
  mkdirSync(VENDOR_DIR, { recursive: true });

  for (const pkg of packages) {
    const spec = `${pkg.name}@${pkg.version}`;
    console.log(`\n→ Packing ${spec}`);
    npmPack(spec, VENDOR_DIR);
    const expectedPath = join(VENDOR_DIR, pkg.tarball);
    try {
      readFileSync(expectedPath);
    } catch {
      const found = readdirSync(VENDOR_DIR).find((file) => file.endsWith('.tgz') && file.includes(pkg.version));
      if (found && found !== pkg.tarball) {
        throw new Error(`Unexpected tarball name for ${pkg.name}: ${found} (expected ${pkg.tarball})`);
      }
      throw new Error(`Tarball not found after pack: ${pkg.tarball}`);
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    mode: 'registry',
    packages,
  };
  writeJson(MANIFEST_PATH, manifest);
  console.log(`\n✓ Wrote ${MANIFEST_PATH}`);
  return manifest;
}

function fileDependency(tarball) {
  return `file:vendor/${tarball}`;
}

function applyStackblitzMode(manifest) {
  const packageJson = readJson(PACKAGE_JSON_PATH);
  const savedDependencies = { ...packageJson.dependencies };
  const savedOverrides = packageJson.overrides ? { ...packageJson.overrides } : undefined;

  for (const pkg of manifest.packages) {
    packageJson.dependencies[pkg.name] = fileDependency(pkg.tarball);
  }

  packageJson.overrides = {
    ...(packageJson.overrides ?? {}),
    '@fortawesome/pro-regular-svg-icons': fileDependency(
      manifest.packages.find((p) => p.name === '@fortawesome/pro-regular-svg-icons').tarball,
    ),
    '@fortawesome/pro-solid-svg-icons': fileDependency(
      manifest.packages.find((p) => p.name === '@fortawesome/pro-solid-svg-icons').tarball,
    ),
  };

  manifest.mode = 'stackblitz';
  manifest.savedDependencies = savedDependencies;
  manifest.savedOverrides = savedOverrides;
  writeJson(MANIFEST_PATH, manifest);
  writeJson(PACKAGE_JSON_PATH, packageJson);

  copyFileSync(NPMRC_STACKBLITZ_PATH, NPMRC_PATH);
  console.log('\n→ Switched .npmrc to StackBlitz mode (no private registry tokens)');

  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  console.log('\n→ Running npm install with vendored tarballs…');
  const result = spawnSync(npmCmd, ['install'], {
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  });
  if ((result.status ?? 1) !== 0) {
    throw new Error('npm install failed after applying StackBlitz vendor mode');
  }

  console.log('\n✓ StackBlitz vendor mode applied.');
  console.log('  Commit vendor/*.tgz, package.json, package-lock.json, and .npmrc on branch stackblitz/vendor.');
  console.log('  Use: git add -f vendor/*.tgz   (tarballs are gitignored on main by default)');
}

function restoreRegistryMode() {
  let manifest;
  try {
    manifest = readJson(MANIFEST_PATH);
  } catch {
    throw new Error('Missing vendor/manifest.json — nothing to restore.');
  }

  const packageJson = readJson(PACKAGE_JSON_PATH);
  const saved = manifest.savedDependencies ?? {};

  for (const pkg of manifest.packages) {
    packageJson.dependencies[pkg.name] = saved[pkg.name] ?? pkg.range;
  }

  if (manifest.savedOverrides) {
    packageJson.overrides = manifest.savedOverrides;
  } else {
    delete packageJson.overrides;
  }

  writeJson(PACKAGE_JSON_PATH, packageJson);
  copyFileSync(NPMRC_REGISTRY_PATH, NPMRC_PATH);
  manifest.mode = 'registry';
  delete manifest.savedDependencies;
  delete manifest.savedOverrides;
  writeJson(MANIFEST_PATH, manifest);

  console.log('\n✓ Restored registry-based package.json and .npmrc');
  console.log('  Run: npm run install:with-registry');
}

function main() {
  const mode = process.argv[2] ?? '--pack';

  if (mode === '--restore') {
    restoreRegistryMode();
    return;
  }

  if (isStackBlitzRuntime()) {
    console.error('vendor:pack must run locally — StackBlitz cannot access private registries.');
    process.exit(1);
  }

  loadEnv();

  const packages = resolveVersionsFromLockfile();
  const manifest = packTarballs(packages);

  if (mode === '--apply') {
    applyStackblitzMode(manifest);
  } else {
    console.log('\nNext: npm run vendor:stackblitz   (apply file: deps + refresh lockfile)');
  }
}

main();
