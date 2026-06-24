export interface FullTableExampleMeta {
  id: string;
  title: string;
  description: string;
  route: string;
  checklist: string[];
}

export interface FullTableExampleGroup {
  label: string;
  examples: FullTableExampleMeta[];
}

export const FULL_TABLE_EXAMPLE_GROUPS: FullTableExampleGroup[] = [
  {
    label: 'Full data layout',
    examples: [
      {
        id: 'full-table-manual',
        title: 'Manual table',
        description:
          'Complete users list with atom-data-layout, toolbar search, Role/Status filters, pagination, row selection, and bulk action bar — built with column defs on atom-table.',
        route: '/examples/full-table/manual',
        checklist: [
          'Search filters by name and email across the full dataset',
          'Role and Status filters combine with search (open each filter panel first)',
          'Select rows — bulk action bar appears with tag and delete actions',
          'Dismiss bulk bar clears selection; delete shows loading then success/error snackbar',
          'Use the delete outcome segment control to force success or error',
          'Pagination slices filtered results (10 per page)',
        ],
      },
      {
        id: 'full-table-builder',
        title: 'Table builder',
        description:
          'Same UX as the manual example, implemented with atom-table-builder column config instead of manual atomColumnDef templates.',
        route: '/examples/full-table/builder',
        checklist: [
          'Same search, filter, pagination, and bulk delete flow as the manual example',
          'Status column renders atom-tag via cellTpl in column config',
          'Sorting works on Name, Role, and Created columns',
          'Dismissing bulk bar remounts the builder to reset checkbox selection',
        ],
      },
    ],
  },
  {
    label: 'Empty states',
    examples: [
      {
        id: 'empty-state-intl',
        title: 'DS empty state (intl)',
        description:
          'Default atom-empty-state fallbacks driven by AtomDataLayoutIntl — customize copy and icons without projecting templates.',
        route: '/examples/full-table/empty-state-intl',
        checklist: [
          'Spanish labels come from SpanishDataLayoutIntl (provide AtomDataLayoutIntl)',
          'Switch states — each renders atom-empty-state with intl-driven title, description, and icon',
          'No ng-template overrides; the layout uses the built-in DS empty state',
        ],
      },
      {
        id: 'empty-state-ds-template',
        title: 'DS empty state (templates)',
        description:
          'Project atom-empty-state inside ng-template atomDataLayoutState overrides — use size, inputs, and action slots while keeping DS anatomy.',
        route: '/examples/full-table/empty-state-ds-template',
        checklist: [
          'Empty uses size="medium" with actionLabel fallback',
          'No data uses size="small" with resultText for the search keyword',
          'Error uses a projected atomEmptyStateAction button on atom-empty-state',
        ],
      },
      {
        id: 'empty-state-custom',
        title: 'Custom empty states',
        description:
          'Replace fallbacks with fully custom markup in ng-template atomDataLayoutState — no atom-empty-state component.',
        route: '/examples/full-table/empty-state-custom',
        checklist: [
          'Switch Empty / No data / Error with the segment control',
          'Each state renders bespoke HTML instead of atom-empty-state',
          'Toolbar and pagination stay visible in every state',
          'Use for illustrations, emoji, or layouts outside the DS empty-state anatomy',
        ],
      },
    ],
  },
];

export const ALL_FULL_TABLE_EXAMPLES = FULL_TABLE_EXAMPLE_GROUPS.flatMap(
  (group) => group.examples,
);
