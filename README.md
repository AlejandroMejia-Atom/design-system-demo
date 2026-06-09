# Atom Design System Demo — Base Scaffold

Reusable Angular playground for `@atomchat-io/ui-design-system` component demos. This branch (`demo/base`) ships the repo and UI shell **without** any component examples — use it as a starting point for new interactive demos.

## Quick start

1. Copy registry credentials:

   ```bash
   cp example.env .env
   ```

   Fill in `ATOMCHAT_NPM_AUTH_TOKEN` and `FONTAWESOME_NPM_AUTH_TOKEN` in `.env`.

2. Install dependencies:

   ```bash
   npm run install:with-registry
   ```

3. Start the dev server:

   ```bash
   npm start
   ```

   Open [http://localhost:4200](http://localhost:4200).

## What's included

- Angular 20 standalone app (zoneless)
- Atom theme SCSS, Inter fonts, design tokens
- Private registry setup (`.npmrc`, `example.env`, `install:with-registry`)
- App shell: sidebar navigation, theme toggle, responsive layout
- `ExamplePageComponent` wrapper for demo pages with checklists
- `demo-config.ts` for app branding and example catalog metadata
- Netlify-ready production build

## Adding a new demo

See [`src/app/examples/README.md`](src/app/examples/README.md).

1. Create a component under `src/app/examples/<feature>/`
2. Register metadata in `src/app/shared/demo-config.ts`
3. Add a lazy route in `src/app/app.routes.ts`

## Reference implementation

Branch `main` contains a full `atom-table` playground built on top of this scaffold.

## Build

```bash
npm run build
```

Output: `dist/demo/browser`.
