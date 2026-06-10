export interface TableBuilderExampleMeta {
  id: string;
  title: string;
  description: string;
  route: string;
  checklist: string[];
  codeSnippet: string;
}

export interface TableBuilderExampleGroup {
  label: string;
  examples: TableBuilderExampleMeta[];
}

export const TABLE_BUILDER_EXAMPLE_GROUPS: TableBuilderExampleGroup[] = [
  {
    label: 'Getting started',
    examples: [
      {
        id: 'basic',
        title: 'Basic',
        description:
          'Declarative columns + array dataSource. No manual atomColumnDef boilerplate.',
        route: '/examples/basic',
        checklist: [
          'Column headers and rows render from the columns config',
          'Plain array is wrapped in AtomTableDataSource internally',
          'atomTrackBy is required for stable row identity',
        ],
        codeSnippet: `import { ATOM_TABLE_BUILDER_IMPORTS } from '@atomchat-io/ui-design-system';

@Component({
  imports: [...ATOM_TABLE_BUILDER_IMPORTS],
  template: \`
    <atom-table-builder
      [columns]="columns"
      [dataSource]="data"
      [atomTrackBy]="trackBy"
    />
  \`,
})
export class BasicExample {
  readonly data = PRODUCT_DATA;
  readonly trackBy = (_: number, row: ProductRow) => row.id;
  readonly columns: AtomTableColumn<ProductRow>[] = [
    { columnName: 'id', columnLabel: 'ID', accessor: 'id', columnType: 'number' },
    { columnName: 'name', columnLabel: 'Name', accessor: 'name' },
    { columnName: 'amount', columnLabel: 'Amount', accessor: 'amount', columnType: 'currency' },
  ];
}`,
      },
      {
        id: 'column-types',
        title: 'Column types',
        description:
          'Built-in formatters for number, currency, and date. defaultSort sets the initial sort column.',
        route: '/examples/column-types',
        checklist: [
          'Currency and date columns use DecimalPipe / DatePipe automatically',
          'Number and currency cells align to the end',
          'Table loads sorted by Name ascending (defaultSort)',
        ],
        codeSnippet: `readonly columns: AtomTableColumn<ProductRow>[] = [
  { columnName: 'id', columnLabel: 'ID', accessor: 'id', columnType: 'number', width: '4rem' },
  { columnName: 'name', columnLabel: 'Name', accessor: 'name', sortable: true, defaultSort: 'asc' },
  { columnName: 'amount', columnLabel: 'Price', accessor: 'amount', columnType: 'currency', sortable: true },
  { columnName: 'date', columnLabel: 'Created At', accessor: 'date', columnType: 'date' },
];`,
      },
    ],
  },
  {
    label: 'Interaction',
    examples: [
      {
        id: 'sorting',
        title: 'Sorting',
        description:
          'Enable sortable: true on columns. atom-table-builder wires atomSort and atomSortHeader for you.',
        route: '/examples/sorting',
        checklist: [
          'Click a sortable header to toggle asc → desc → none',
          'Only one column holds active sort at a time',
          'Sorting applies before pagination when both are used',
        ],
        codeSnippet: `{ columnName: 'name', columnLabel: 'Name', accessor: 'name', sortable: true, defaultSort: 'asc' }
{ columnName: 'amount', columnLabel: 'Amount', accessor: 'amount', columnType: 'currency', sortable: true }`,
      },
      {
        id: 'pagination',
        title: 'Pagination',
        description:
          'Combine AtomTableDataSource with atom-pagination via the atomPaginator property.',
        route: '/examples/pagination',
        checklist: [
          'Paginator length tracks filteredData.length',
          'Changing page size updates visible rows',
          'Sort the full dataset, then paginate — order is preserved',
        ],
        codeSnippet: `readonly dataSource = new AtomTableDataSource(USER_DATA);
private readonly paginator = viewChild.required<AtomPaginationComponent>('paginator');

constructor() {
  afterNextRender(() => {
    this.dataSource.atomPaginator = this.paginator();
  });
}

// template
<atom-table-builder [columns]="columns" [dataSource]="dataSource" [atomTrackBy]="trackBy" />
<atom-pagination
  #paginator
  [length]="dataSource.filteredData.length"
  [pageSize]="5"
  [pageSizeOptions]="[5, 10, 25]"
/>`,
      },
      {
        id: 'selection-multiple',
        title: 'Multiple selection',
        description:
          'selectable + multiple adds a checkbox column and emits selectionChange.',
        route: '/examples/selection-multiple',
        checklist: [
          'Header checkbox selects/deselects all rows on the current page',
          'selectionChange emits the full selected row set',
          'Selected count updates in the demo panel',
        ],
        codeSnippet: `<atom-table-builder
  [columns]="columns"
  [dataSource]="data"
  [atomTrackBy]="trackBy"
  [selectable]="true"
  [multiple]="true"
  (selectionChange)="onSelectionChange($event)"
/>`,
      },
      {
        id: 'selection-single',
        title: 'Single selection',
        description: 'Set multiple to false for single-selection mode without checkboxes.',
        route: '/examples/selection-single',
        checklist: [
          'Click a row to select it — previous selection clears',
          'No checkbox column is rendered',
          'rowClick fires on every row click',
        ],
        codeSnippet: `<atom-table-builder
  [columns]="columns"
  [dataSource]="data"
  [atomTrackBy]="trackBy"
  [selectable]="true"
  [multiple]="false"
  (rowClick)="onRowClick($event)"
  (selectionChange)="onSelectionChange($event)"
/>`,
      },
      {
        id: 'max-selection',
        title: 'Max selection',
        description: 'Cap how many rows can be selected with maxSelection.',
        route: '/examples/max-selection',
        checklist: [
          'Selection stops after 3 rows',
          'Already-selected rows can still be deselected',
          'Useful for bulk actions with limits',
        ],
        codeSnippet: `<atom-table-builder
  [columns]="columns"
  [dataSource]="data"
  [atomTrackBy]="trackBy"
  [selectable]="true"
  [multiple]="true"
  [maxSelection]="3"
  (selectionChange)="onSelectionChange($event)"
/>`,
      },
    ],
  },
  {
    label: 'Customization',
    examples: [
      {
        id: 'custom-template',
        title: 'Custom cell template',
        description:
          'cellTpl overrides the columnType formatter. Template context exposes value, row, index, and column.',
        route: '/examples/custom-template',
        checklist: [
          'Status column renders atomTag instead of a boolean string',
          'cellTpl must be assigned after view init (TemplateRef)',
          'Template receives let-value="value" and let-row="$implicit"',
        ],
        codeSnippet: `@Component({
  template: \`
    <atom-table-builder [columns]="columns()" [dataSource]="data" [atomTrackBy]="trackBy" />
    <ng-template #statusTpl let-value="value">
      <span atomTag [intent]="value ? 'success' : 'neutral'">
        {{ value ? 'Active' : 'Inactive' }}
      </span>
    </ng-template>
  \`,
})
export class CustomTemplateExample implements AfterViewInit {
  private readonly statusTpl = viewChild<TemplateRef<AtomCellContext<ProductRow>>>('statusTpl');

  ngAfterViewInit(): void {
    this.columns.set([
      { columnName: 'name', columnLabel: 'Name', accessor: 'name' },
      { columnName: 'active', columnLabel: 'Status', accessor: 'active', cellTpl: this.statusTpl() },
    ]);
  }
}`,
      },
      {
        id: 'sticky-columns',
        title: 'Sticky columns',
        description: 'Pin columns with sticky (left) or stickyEnd (right) in the column config.',
        route: '/examples/sticky-columns',
        checklist: [
          'Scroll horizontally inside the viewport — ID stays pinned left',
          'Status column stays pinned right',
          'Middle columns scroll underneath the pinned edges',
        ],
        codeSnippet: `{ columnName: 'id', columnLabel: 'ID', accessor: 'id', sticky: true, width: '5rem' }
{ columnName: 'status', columnLabel: 'Status', accessor: 'status', stickyEnd: true, width: '7rem' }`,
      },
    ],
  },
  {
    label: 'Edge cases',
    examples: [
      {
        id: 'empty-state',
        title: 'Empty state',
        description:
          'Project atomNoDataRow into atom-table-builder when the dataSource has no rows.',
        route: '/examples/empty-state',
        checklist: [
          'Table renders the no-data template instead of rows',
          'atom-empty-state shows heading and supporting text',
          'Columns config is still required even with empty data',
        ],
        codeSnippet: `<atom-table-builder [columns]="columns" [dataSource]="[]" [atomTrackBy]="trackBy">
  <ng-template atomNoDataRow>
    <tr class="atom-no-data-row">
      <td [attr.colspan]="columns.length">
        <atom-empty-state heading="No records" supportingText="Try adjusting filters" />
      </td>
    </tr>
  </ng-template>
</atom-table-builder>`,
      },
    ],
  },
];

export const ALL_TABLE_BUILDER_EXAMPLES: TableBuilderExampleMeta[] =
  TABLE_BUILDER_EXAMPLE_GROUPS.flatMap((group) => group.examples);

export function tableBuilderExampleById(id: string): TableBuilderExampleMeta {
  const example = ALL_TABLE_BUILDER_EXAMPLES.find((item) => item.id === id);
  if (!example) {
    throw new Error(`Unknown table-builder example: ${id}`);
  }
  return example;
}
