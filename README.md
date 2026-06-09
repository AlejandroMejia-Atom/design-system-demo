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

   **Install fails with `EIO` / "not found in cache"?** npm's cache may be corrupted (common in containers). Run:

   ```bash
   npm cache clean --force
   npm run install:with-registry
   ```

3. Start the dev server:

   ```bash
   npm start
   ```

   Open [http://localhost:4200](http://localhost:4200). Each example is a lazy-loaded route with a sidebar, theme toggle, and a “What to test” checklist.

## Examples

| Route | Feature |
|-------|---------|
| `/examples/basic` | Static table |
| `/examples/sort` | Column sorting |
| `/examples/pagination` | Pagination + sort |
| `/examples/sticky-columns` | Sticky left/right columns |
| `/examples/selectable` | Row selection (multiple) |
| `/examples/checkboxes` | Checkbox column + max selection |
| `/examples/single-selection` | Single selection mode |
| `/examples/empty-state` | No-data row + empty state |
| `/examples/cell-patterns` | Auto cell alignment |

## Build

```bash
npm run build
```

Output: `dist/demo/browser` (Netlify-ready).

## Stack

- Angular 20 (standalone, zoneless)
- `@atomchat-io/ui-design-system` + `@atomchat-io/ui-tokens`
- Font Awesome Pro (peer dependency for icons)

Examples are ported from atom-ui Storybook stories in `libs/ui-design-system/src/lib/components/table/table.stories.ts`.
