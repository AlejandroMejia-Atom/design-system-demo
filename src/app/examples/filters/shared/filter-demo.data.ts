export interface FilterOption {
  readonly value: string;
  readonly label: string;
}

export const STATUS_OPTIONS: readonly FilterOption[] = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

export const PRIORITY_OPTIONS: readonly FilterOption[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

export const TAG_OPTIONS: readonly FilterOption[] = [
  { value: 'billing', label: 'Billing' },
  { value: 'support', label: 'Support' },
  { value: 'sales', label: 'Sales' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'api', label: 'API' },
];

/** Labels used in the chip truncation demo (4+ items trigger the "+N" counter). */
export const CHIP_LABEL_SAMPLES = {
  few: ['Open', 'In progress'],
  many: ['Open', 'In progress', 'Resolved', 'Closed', 'Escalated'],
  long: ['A very long category label that should ellipsize in the chip'],
} as const;

/** Defaults used by the initial-values example (e.g. restored from route state). */
export const INITIAL_STATUS_FILTER = ['open', 'in_progress'] as const;
export const INITIAL_PRIORITY_FILTER = 'high';
