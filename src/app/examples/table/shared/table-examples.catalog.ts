export interface TableExampleMeta {
  id: string;
  title: string;
  description: string;
  route: string;
  checklist: string[];
}

export interface TableExampleGroup {
  label: string;
  examples: TableExampleMeta[];
}

export const TABLE_EXAMPLE_GROUPS: TableExampleGroup[] = [
  {
    label: 'Core',
    examples: [
      {
        id: 'basic',
        title: 'Basic',
        description: 'Static table without sorting or pagination.',
        route: '/examples/basic',
        checklist: [
          'Verify column headers and row data render correctly',
          'Confirm header row stays sticky on vertical scroll',
        ],
      },
      {
        id: 'sort',
        title: 'Sort',
        description:
          'Click column headers to sort. Requires atomSort on the table and atomSortHeader on sortable headers.',
        route: '/examples/sort',
        checklist: [
          'Click a column header to sort ascending',
          'Click again for descending, then a third time to clear sort',
          'Default sort starts on Amount ascending',
        ],
      },
      {
        id: 'pagination',
        title: 'Pagination',
        description:
          'Combines client-side sorting with Atom pagination. Sorting applies to the full dataset before pagination slices rows.',
        route: '/examples/pagination',
        checklist: [
          'Sort a column and confirm pagination reflects the sorted order',
          'Change page size via the paginator control',
          'Navigate between pages with prev/next',
        ],
      },
    ],
  },
  {
    label: 'Layout',
    examples: [
      {
        id: 'sticky-columns',
        title: 'Sticky Columns',
        description:
          'ID column sticks to the left and Actions sticks to the right inside a horizontally scrollable container.',
        route: '/examples/sticky-columns',
        checklist: [
          'Scroll horizontally — ID and Actions columns stay pinned',
          'Scroll vertically — header row stays sticky',
        ],
      },
      {
        id: 'cell-patterns',
        title: 'Cell Patterns',
        description:
          'Cell alignment is driven automatically by content type via CSS :has(). Text left, tags/chips center, buttons right.',
        route: '/examples/cell-patterns',
        checklist: [
          'Name column text aligns left',
          'Tag and chip columns center their content',
          'Actions column aligns the button to the right',
        ],
      },
    ],
  },
  {
    label: 'Selection',
    examples: [
      {
        id: 'selectable',
        title: 'Selectable Rows',
        description:
          'Selectable table (multiple mode). Click rows to toggle selection. Rows 3 and 6 are disabled.',
        route: '/examples/selectable',
        checklist: [
          'Click rows to toggle selection highlight',
          'Rows 3 and 6 cannot be selected (disabled)',
          'Use keyboard Enter/Space on focused rows',
        ],
      },
      {
        id: 'checkboxes',
        title: 'Selection Checkboxes',
        description:
          'Checkbox column with master toggle. Selection capped at 3 rows via atomMaxSelection.',
        route: '/examples/checkboxes',
        checklist: [
          'Use header checkbox for select/deselect all',
          'Selection stops at 3 rows maximum',
          'Row 3 is disabled and cannot be selected',
        ],
      },
      {
        id: 'single-selection',
        title: 'Single Selection',
        description:
          'Single-selection mode via atomSelectionMode="single". Only one row at a time.',
        route: '/examples/single-selection',
        checklist: [
          'Select a row, then another — previous selection clears',
          'Only one row stays highlighted at a time',
        ],
      },
      {
        id: 'empty-state',
        title: 'Empty State',
        description:
          'Selectable table with manual selection and an empty-state no-data row.',
        route: '/examples/empty-state',
        checklist: [
          'Table shows atom-empty-state when data is empty',
          'No-data row template renders correctly',
        ],
      },
    ],
  },
];

export const ALL_TABLE_EXAMPLES: TableExampleMeta[] = TABLE_EXAMPLE_GROUPS.flatMap(
  (group) => group.examples,
);
