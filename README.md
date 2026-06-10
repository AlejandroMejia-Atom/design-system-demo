# Atom Paginator Playground

Interactive demos for the full `atom-pagination` API in `@atomchat-io/ui-design-system` v0.5.0.
Includes vendored private packages for StackBlitz.

## Quick start

1. Copy registry credentials:

   ```bash
   cp example.env .env
   ```

   Fill in `ATOMCHAT_NPM_AUTH_TOKEN` and `FONTAWESOME_NPM_AUTH_TOKEN` in `.env`.

2. Install dependencies (reads tokens from `.env`; only requires Node.js — no prior `npm install`):

   ```bash
   npm run install:with-registry
   ```

   **Install fails with `EIO` / "not found in cache"?** On local machines:

   ```bash
   npm cache clean --force
   npm run install:with-registry
   ```

   If you are on **StackBlitz**, deps install from committed `vendor/*.tgz` — see below.

3. Start the dev server:

   ```bash
   npm start
   ```

   Open [http://localhost:4200](http://localhost:4200). Each example is a lazy-loaded route with a sidebar, theme toggle, and a “What to test” checklist.

## Examples

| Route | Feature |
| ----- | ------- |
| `/examples/first-page` | Default first-page state |
| `/examples/middle-page` | Mid-range page index |
| `/examples/last-page` | Last page — disabled next/last |
| `/examples/single-page` | Dataset smaller than page size |
| `/examples/empty-dataset` | `length = 0` empty state |
| `/examples/i18n-spanish` | `AtomPaginatorIntl` — Spanish labels |
| `/examples/i18n-item-range` | Custom `getRangeLabel` — item range format |
| `/examples/data-source` | `AtomTableDataSource` + `atomPaginator` wiring |

## Build

```bash
npm run build
```

Output: `dist/demo/browser` (Netlify-ready).

## StackBlitz

This branch ships with vendored tarballs — no private registry tokens required.

```
https://stackblitz.com/github/{ORG}/design-system-table/tree/feature/design-system-paginator?title=Atom%20Paginator
```

**If install fails with `npm.fontawesome.com` / `ECONNRESET`:**

```bash
npm run vendor:fix-lockfile
```

See `vendor/README.md` for vendor workflow details.

## Stack

- Angular 20 (standalone, zoneless)
- `@atomchat-io/ui-design-system` + `@atomchat-io/ui-tokens`
- Font Awesome Pro (peer dependency for icons)

Examples are ported from atom-ui Storybook stories in `libs/ui-design-system/src/lib/components/pagination/atom-pagination.stories.ts`.
