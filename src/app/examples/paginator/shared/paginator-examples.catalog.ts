export interface PaginatorExampleConfig {
  length: number;
  pageSize: number;
  pageIndex: number;
}

export interface PaginatorExampleMeta {
  id: string;
  title: string;
  description: string;
  route: string;
  checklist: string[];
  config?: PaginatorExampleConfig;
}

export interface PaginatorExampleGroup {
  label: string;
  examples: PaginatorExampleMeta[];
}

export const PAGINATOR_EXAMPLE_GROUPS: PaginatorExampleGroup[] = [
  {
    label: 'Navigation states',
    examples: [
      {
        id: 'first-page',
        title: 'First page',
        description: 'Default state on page 1 with a multi-page dataset.',
        route: '/examples/first-page',
        config: { length: 100, pageSize: 10, pageIndex: 0 },
        checklist: [
          'Previous and first controls are disabled',
          'Page info shows page 1 of 10',
          'Next and last controls are enabled',
        ],
      },
      {
        id: 'middle-page',
        title: 'Middle page',
        description: 'Mid-range page index with all navigation controls enabled.',
        route: '/examples/middle-page',
        config: { length: 100, pageSize: 10, pageIndex: 4 },
        checklist: [
          'All navigation buttons are enabled',
          'Page info reflects the bound pageIndex input',
        ],
      },
      {
        id: 'last-page',
        title: 'Last page',
        description: 'Final page — next and last controls should disable.',
        route: '/examples/last-page',
        config: { length: 100, pageSize: 10, pageIndex: 9 },
        checklist: [
          'Next and last controls are disabled',
          'Previous and first controls remain enabled',
        ],
      },
      {
        id: 'single-page',
        title: 'Single page',
        description: 'Dataset smaller than pageSize — only one page exists.',
        route: '/examples/single-page',
        config: { length: 5, pageSize: 10, pageIndex: 0 },
        checklist: [
          'Navigation controls disable when totalPages === 1',
          'Page info still reflects the dataset length',
        ],
      },
      {
        id: 'empty-dataset',
        title: 'Empty dataset',
        description: 'length = 0 — empty-state labels and disabled navigation.',
        route: '/examples/empty-dataset',
        config: { length: 0, pageSize: 10, pageIndex: 0 },
        checklist: [
          'Range label shows the empty format (0 of 0)',
          'All navigation controls are disabled',
        ],
      },
    ],
  },
  {
    label: 'Internationalization',
    examples: [
      {
        id: 'i18n-spanish',
        title: 'Custom labels (Spanish)',
        description:
          'Extend AtomPaginatorIntl, override label fields and getRangeLabel, then provide at component scope.',
        route: '/examples/i18n-spanish',
        config: { length: 100, pageSize: 10, pageIndex: 2 },
        checklist: [
          'Records-per-page label reads “Registros por página”',
          'Page info uses “Página X de Y”',
          'Navigation aria-labels are localized',
        ],
      },
      {
        id: 'i18n-item-range',
        title: 'Custom page-info (item range)',
        description:
          'Override getRangeLabel only to show MatPaginator-style “1 – 10 of 100” instead of page counts.',
        route: '/examples/i18n-item-range',
        config: { length: 100, pageSize: 10, pageIndex: 4 },
        checklist: [
          'Page info shows item range, not page number',
          'Range updates when page size or index changes',
        ],
      },
    ],
  },
  {
    label: 'Integration',
    examples: [
      {
        id: 'data-source',
        title: 'Client-side data source',
        description:
          'Wire pageChange to slice a local dataset and keep [length], [pageIndex], and [pageSize] in sync. For atom-table, assign AtomTableDataSource.atomPaginator instead.',
        route: '/examples/data-source',
        checklist: [
          'List updates to show only the current page slice',
          'pageChange payload includes pageIndex, previousPageIndex, pageSize, length',
          'Changing page size resets to page 0 and emits pageChange',
          'Shrinking length clamps the page index with a corrective pageChange',
        ],
      },
    ],
  },
];

export const ALL_PAGINATOR_EXAMPLES: PaginatorExampleMeta[] = PAGINATOR_EXAMPLE_GROUPS.flatMap(
  (group) => group.examples,
);

export function paginatorExampleById(id: string): PaginatorExampleMeta {
  const example = ALL_PAGINATOR_EXAMPLES.find((entry) => entry.id === id);
  if (!example) {
    throw new Error(`Unknown paginator example: ${id}`);
  }
  return example;
}
