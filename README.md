# Atom Table Builder Playground

Interactive demos for **`atom-table-builder`** in `@atomchat-io/ui-design-system` v0.6.0.

`atom-table-builder` is a declarative wrapper around `atom-table`. Pass a `columns` config and a `dataSource` instead of writing `atomColumnDef` / `*atomHeaderCellDef` / `*atomCellDef` for every column.

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

   On **StackBlitz**, open branch `feature/design-system-table-builder` — deps install from vendored tarballs.

3. Start the dev server:

   ```bash
   npm start
   ```

   Open [http://localhost:4200](http://localhost:4200). Each route includes a live demo, a **What to test** checklist, and copy-paste **Example code**.

## Import

```typescript
import {
  ATOM_TABLE_BUILDER_IMPORTS,
  AtomTableBuilderComponent,
  AtomTableColumn,
  AtomTableDataSource,
  AtomPaginationComponent,
} from '@atomchat-io/ui-design-system';
```

`ATOM_TABLE_BUILDER_IMPORTS` bundles the builder component and its formatting pipes (`atomTableCellRender`, `atomTableAlign`, `atomTableCellValue`).

## Minimal example

```typescript
@Component({
  imports: [...ATOM_TABLE_BUILDER_IMPORTS],
  template: `
    <atom-table-builder
      [columns]="columns"
      [dataSource]="rows"
      [atomTrackBy]="trackBy"
    />
  `,
})
export class ProductListComponent {
  readonly rows = PRODUCT_DATA;
  readonly trackBy = (_: number, row: ProductRow) => row.id;

  readonly columns: AtomTableColumn<ProductRow>[] = [
    { columnName: 'id', columnLabel: 'ID', accessor: 'id', columnType: 'number' },
    { columnName: 'name', columnLabel: 'Name', accessor: 'name', sortable: true },
    { columnName: 'amount', columnLabel: 'Price', accessor: 'amount', columnType: 'currency' },
  ];
}
```

## API reference

### Inputs

| Input | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `columns` | `AtomTableColumn<T>[]` | yes | Column definitions (see below) |
| `dataSource` | `T[]` \| `AtomTableDataSource<T>` | yes | Plain array or data source instance |
| `atomTrackBy` | `TrackByFunction<T>` | yes | Stable row identity for DOM recycling |
| `selectable` | `boolean` | no | Enables row selection (default `false`) |
| `multiple` | `boolean` | no | Multiple selection + checkbox column (default `true`) |
| `maxSelection` | `number` | no | Caps selected row count |

### Outputs

| Output | Payload | Description |
| ------ | ------- | ----------- |
| `rowClick` | `T` | Fires when a row is clicked |
| `selectionChange` | `readonly T[]` | Current selection set |

### `AtomTableColumn<T>`

| Property | Description |
| -------- | ----------- |
| `columnName` | Unique id — forwarded to `[atomColumnDef]` |
| `columnLabel` | Default header text |
| `accessor` | `keyof T` or `(row: T) => unknown` |
| `columnType` | `'text'` \| `'number'` \| `'currency'` \| `'date'` \| `'custom'` — drives formatter and alignment |
| `sortable` | Adds `[atomSortHeader]` |
| `defaultSort` | `'asc'` \| `'desc'` — initial sort (requires `sortable: true`) |
| `cellTpl` | `TemplateRef<AtomCellContext<T>>` — overrides built-in formatter |
| `headerTpl` | Custom header template |
| `sticky` / `stickyEnd` | Pin column left / right |
| `width` | CSS width hint (e.g. `'5rem'`, `'15%'`) |
| `numberFormat` | DecimalPipe format (columnType `number`) |
| `currencyCode` / `currencyDisplay` | CurrencyPipe options |
| `dateFormat` | DatePipe format (columnType `date`) |

### Cell template context

When using `cellTpl`, the template receives:

```html
<ng-template #statusTpl let-row let-value="value" let-index="index" let-column="column">
  <!-- value = accessor(row), row = full row object -->
</ng-template>
```

Assign `cellTpl` after view init — `TemplateRef` is only available from `viewChild()` in `ngAfterViewInit`.

### Pagination

Use `AtomTableDataSource` and wire `atomPaginator` after render:

```typescript
readonly dataSource = new AtomTableDataSource(USER_DATA);
private readonly paginator = viewChild.required<AtomPaginationComponent>('paginator');

constructor() {
  afterNextRender(() => {
    this.dataSource.atomPaginator = this.paginator();
  });
}
```

```html
<atom-table-builder [columns]="columns" [dataSource]="dataSource" [atomTrackBy]="trackBy" />
<atom-pagination
  #paginator
  [length]="dataSource.filteredData.length"
  [pageSize]="5"
  [pageSizeOptions]="[5, 10, 25]"
/>
```

### Empty state

Project `atomNoDataRow` as content:

```html
<atom-table-builder [columns]="columns" [dataSource]="[]" [atomTrackBy]="trackBy">
  <ng-template atomNoDataRow>
    <tr class="atom-no-data-row">
      <td [attr.colspan]="columns.length">
        <atom-empty-state heading="No records" supportingText="Nothing to show" />
      </td>
    </tr>
  </ng-template>
</atom-table-builder>
```

## Examples

| Route | Feature |
| ----- | ------- |
| `/examples/basic` | Declarative columns + array dataSource |
| `/examples/column-types` | number, currency, date formatters + defaultSort |
| `/examples/sorting` | Sortable headers |
| `/examples/pagination` | AtomTableDataSource + atom-pagination |
| `/examples/selection-multiple` | Checkbox selection + selectionChange |
| `/examples/selection-single` | Single selection mode |
| `/examples/max-selection` | maxSelection cap |
| `/examples/custom-template` | cellTpl with atomTag |
| `/examples/sticky-columns` | sticky / stickyEnd columns |
| `/examples/empty-state` | atomNoDataRow + atom-empty-state |

## Build

```bash
npm run build
```

Output: `dist/demo/browser` (Netlify-ready).

## StackBlitz

```
https://stackblitz.com/github/AlejandroMejia-Atom/design-system-demo/tree/feature/design-system-table-builder?title=Atom%20Table%20Builder
```

This branch inherits vendored packages from `stackblitz/vendor` (ui-design-system 0.6.0).

**If install fails with `npm.fontawesome.com` / `ECONNRESET`:**

```bash
npm run vendor:fix-lockfile
```

See `vendor/README.md` for the vendor workflow.

## Stack

- Angular 20 (standalone, zoneless)
- `@atomchat-io/ui-design-system` 0.6.0 + `@atomchat-io/ui-tokens`
- Font Awesome Pro (peer dependency for icons)

Examples are ported from atom-ui Storybook stories in `libs/ui-design-system/src/lib/components/table-builder/atom-table-builder.stories.ts`.
