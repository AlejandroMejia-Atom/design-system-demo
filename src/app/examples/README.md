# Examples

Add component demos under this folder, one subdirectory per scenario.

## Checklist for a new demo

1. Create a standalone component in `src/app/examples/<feature>/`.
2. Wrap the live UI with `ExamplePageComponent` from `src/app/shared/`.
3. Register metadata in `EXAMPLE_GROUPS` inside `src/app/shared/demo-config.ts`.
4. Add a lazy route in `src/app/app.routes.ts` under the shell children.

Example route:

```typescript
{
  path: 'examples/my-feature',
  loadComponent: () =>
    import('./examples/my-feature/my-feature-example.component').then(
      (m) => m.MyFeatureExampleComponent,
    ),
  title: 'My Feature',
}
```
