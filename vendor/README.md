# Vendor tarballs (StackBlitz)

Private packages that StackBlitz cannot fetch from npm registries are packed here as `.tgz` files.

## Generate (local only)

```bash
cp example.env .env   # tokens required for npm pack
npm run vendor:pack           # download tarballs
npm run vendor:stackblitz     # pack + switch to file: deps + npm install
```

## Publish for StackBlitz

On branch `stackblitz/vendor` (recommended):

```bash
git checkout -b stackblitz/vendor
git add -f vendor/*.tgz vendor/manifest.json package.json package-lock.json .npmrc
git commit -m "chore(stackblitz): vendor private npm packages"
git push -u origin stackblitz/vendor
```

Open that branch in StackBlitz — `installDependencies` uses the committed tarballs; no Git LFS, no registry tokens.

## Restore registry mode (main branch)

```bash
npm run vendor:restore
npm run install:with-registry
```

Tarballs (`vendor/*.tgz`) are gitignored on `main` so they are not committed by accident. Force-add them only on the StackBlitz branch.
