export interface FilterExampleMeta {
  id: string;
  title: string;
  description: string;
  route: string;
  checklist: string[];
}

export interface FilterExampleGroup {
  label: string;
  examples: FilterExampleMeta[];
}

export const FILTER_EXAMPLE_GROUPS: FilterExampleGroup[] = [
  {
    label: 'Primitives',
    examples: [
      {
        id: 'filter-trigger',
        title: 'Filter trigger',
        description:
          'button[atom-filter-trigger] — icon, optional visible label, and badge when filters are applied. ariaLabel is required.',
        route: '/examples/filters/filter-trigger',
        checklist: [
          'Badge appears only when badgeCount > 0',
          'Active styling applies with a non-zero badge',
          'Disabled state blocks interaction',
          'ariaLabel is announced by screen readers (distinct from visible label)',
        ],
      },
      {
        id: 'filter-chip',
        title: 'Filter chip',
        description:
          'atom-filter-chip with atomFilterChipLabels — truncates selected labels and shows a "+N" counter when more than three values are applied.',
        route: '/examples/filters/filter-chip',
        checklist: [
          'Up to three labels render comma-separated',
          'A fourth selection adds a "+1" counter suffix',
          'Long labels ellipsize via CSS',
          'Remove button clears via (cleared); chip body emits (chipClick)',
        ],
      },
    ],
  },
  {
    label: 'Composition',
    examples: [
      {
        id: 'filter-row',
        title: 'Filter row',
        description:
          'atom-filter-row toolbar: projected trigger, applied-category chips, and optional "Clear filters" (from ATOM_FILTER_ROW_LABELS).',
        route: '/examples/filters/filter-row',
        checklist: [
          'Row exposes role="toolbar" with rowAriaLabel from the DI token',
          'Clear button appears only when chips are present',
          'Arrow keys move focus across trigger, chips, and clear',
          'allFiltersCleared fires when clear is activated',
        ],
      },
      {
        id: 'filter-panel',
        title: 'Filter panel',
        description:
          'atom-filter-panel — two-column layout: category list (left) and atom-select-panel per category (right). Use [renderInline]="true" for standalone demos.',
        route: '/examples/filters/filter-panel',
        checklist: [
          'Click a category to swap the right column',
          'Footer shows countPattern ({selected} of {total}) and clear actions',
          'Right column panels need renderInline on atom-select-panel',
          'Categories must be static atom-list-item[atomFilterCategory] nodes (no control-flow loops)',
        ],
      },
      {
        id: 'filter-category',
        title: 'Filter category',
        description:
          'atom-list-item[atomFilterCategory] — links a TemplateRef panel, implements ControlValueAccessor, and proxies selection state to chips.',
        route: '/examples/filters/filter-category',
        checklist: [
          'Category templates must use atom-select-panel with renderInline',
          '[multiple]="false" limits selection to one value',
          'See Initial values and Selection changes for FormControl patterns',
          'selectedLabels() drives chip text via atomFilterChipLabels',
        ],
      },
    ],
  },
  {
    label: 'Integration',
    examples: [
      {
        id: 'filter-organism',
        title: 'atom-filter organism',
        description:
          'Full filter: row + dropdown panel. Project categories statically; the organism wires trigger, chips, badge, and overlay.',
        route: '/examples/filters/filter-organism',
        checklist: [
          'Trigger opens the panel at bottom-start with preserved content',
          'Badge counts categories with selections, not individual values',
          'Chip click reopens the panel on that category',
          'showChips=false hides chips but keeps the badge counter',
        ],
      },
      {
        id: 'filter-initial-values',
        title: 'Initial values',
        description:
          'Seed each category with a FormControl (multi array or single scalar). Chips and badge update before the panel is opened.',
        route: '/examples/filters/filter-initial-values',
        checklist: [
          'Status starts with open + in_progress — chip visible on load',
          'Priority starts with high (single-select category)',
          'setValue from outside updates chips without opening the panel',
          'writeValue triggers requestEagerAttach for label resolution',
        ],
      },
      {
        id: 'filter-selection-changes',
        title: 'Selection changes',
        description:
          'React to user selections via FormControl.valueChanges (reactive) or atom-select-panel selectionChanged reading selectedValues() from the panel (no FormControl).',
        route: '/examples/filters/filter-selection-changes',
        checklist: [
          'FormControl: valueChanges emits on each option toggle',
          'Without FormControl: selectionChanged fires from atom-select-panel (void payload)',
          'Read selectedValues() and selectedLabels() from the panel instance in the handler',
          'Category directive selectedLabels() also proxies panel state for chips/UI',
        ],
      },
      {
        id: 'filter-i18n',
        title: 'Internationalization',
        description:
          'Override ATOM_FILTER_ROW_LABELS and ATOM_FILTER_PANEL_CONFIG (app-wide or per component) plus per-instance panel inputs.',
        route: '/examples/filters/filter-i18n',
        checklist: [
          'Row labels: cleanFiltersButton, rowAriaLabel, triggerAriaLabel, triggerLabel',
          'Panel labels: clearAllLabel, clearCategoryLabel, countPattern, categoriesLabel, dialogLabel',
          'countPattern placeholders {selected} and {total} are replaced at runtime',
          'Chip removeAriaLabel / chipAriaLabel remain consumer-provided per category',
        ],
      },
    ],
  },
];

export const ALL_FILTER_EXAMPLES = FILTER_EXAMPLE_GROUPS.flatMap((g) => g.examples);
