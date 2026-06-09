# Atom Table Playground

Interactive demo app for every `atom-table` capability in `@atomchat-io/ui-design-system` v0.5.0.

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

   **Manual alternative** — export the variables in your shell, then install:

   ```bash
   export ATOMCHAT_NPM_AUTH_TOKEN=your_token
   export FONTAWESOME_NPM_AUTH_TOKEN=your_token
   npm install
   ```

   PowerShell:

   ```powershell
   $env:ATOMCHAT_NPM_AUTH_TOKEN = "your_token"
   $env:FONTAWESOME_NPM_AUTH_TOKEN = "your_token"
   npm install
   ```

   **Install fails with `EIO` / "not found in cache"?** On local machines, clear npm's cache and retry:

   ```bash
   npm cache clean --force
   npm run install:with-registry
   ```

   If you are on **StackBlitz**, see the section below — cache clean will not help.

3. Start the dev server:

   ```bash
   npm start
   ```

   Open [http://localhost:4200](http://localhost:4200). Each example is a lazy-loaded route with a sidebar, theme toggle, and a “What to test” checklist.

## Examples

| Route                        | Feature                         |
| ---------------------------- | ------------------------------- |
| `/examples/basic`            | Static table                    |
| `/examples/sort`             | Column sorting                  |
| `/examples/pagination`       | Pagination + sort               |
| `/examples/sticky-columns`   | Sticky left/right columns       |
| `/examples/selectable`       | Row selection (multiple)        |
| `/examples/checkboxes`       | Checkbox column + max selection |
| `/examples/single-selection` | Single selection mode           |
| `/examples/empty-state`      | No-data row + empty state       |
| `/examples/cell-patterns`    | Auto cell alignment             |

## Build

```bash
npm run build
```

Output: `dist/demo/browser` (Netlify-ready).

## StackBlitz

**This project does not run on StackBlitz free / personal tiers.**

The demo depends on private npm packages:

- `@atomchat-io/*` (restricted scope on registry.npmjs.org)
- `@fortawesome/pro-*` (Font Awesome Pro registry at npm.fontawesome.com)

StackBlitz WebContainers use a browser-based npm client that [does not support custom private registries](https://github.com/stackblitz/webcontainer-core/issues/21) unless you configure **StackBlitz Teams / Enterprise** private registry integration in the workspace dashboard.

Symptoms on StackBlitz include `EIO: '@fortawesome/pro-solid-svg-icons@…' not found in cache`. That is expected — **`npm run install:with-registry` is for local development only** and will exit immediately inside StackBlitz with an explanation.

**Recommended alternatives:**

| Goal              | Approach                                                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Try the demo      | Clone locally → `cp example.env .env` → `npm run install:with-registry` → `npm start`                                                                                                 |
| Share with others | Deploy `dist/demo/browser` to Netlify (see `netlify.toml`)                                                                                                                            |
| StackBlitz in org | [Private NPM registry integration](https://developer.stackblitz.com/teams/private-npm-registry-integration) — do not use `install:with-registry`; deps install when the project opens |

## Stack

- Angular 20 (standalone, zoneless)
- `@atomchat-io/ui-design-system` + `@atomchat-io/ui-tokens`
- Font Awesome Pro (peer dependency for icons)

Examples are ported from atom-ui Storybook stories in `libs/ui-design-system/src/lib/components/table/table.stories.ts`.
