import type { AtomFormFieldSize, AtomTextFieldInputType } from '@atomchat-io/ui-design-system';

export interface SelectOption {
  value: string;
  label: string;
}

/** atom-text-field — Storybook: xs, s, m, l, xl */
export const TEXT_FIELD_SIZES: readonly AtomFormFieldSize[] = ['xs', 's', 'm', 'l', 'xl'];

/** textarea via atom-text-field — Storybook: m, xl only */
export const TEXT_AREA_SIZES: readonly AtomFormFieldSize[] = ['m', 'xl'];

/** atom-search-input — Storybook: s, m, l */
export const SEARCH_INPUT_SIZES: readonly AtomFormFieldSize[] = ['s', 'm', 'l'];

/** atom-select-input — Storybook: xs, s, m, l, xl */
export const SELECT_INPUT_SIZES: readonly AtomFormFieldSize[] = ['xs', 's', 'm', 'l', 'xl'];

/** atom-date-picker — Storybook: xs, s, m, l, xl */
export const DATE_PICKER_SIZES: readonly AtomFormFieldSize[] = ['xs', 's', 'm', 'l', 'xl'];

/** atom-time-picker — Storybook: xs, s, m, l, xl */
export const TIME_PICKER_SIZES: readonly AtomFormFieldSize[] = ['xs', 's', 'm', 'l', 'xl'];

export const SEARCH_DEBOUNCE_OPTIONS = ['0', '200', '400', '800'] as const;

export const TIME_FORMAT_OPTIONS = ['12h', '24h'] as const;

export const TIME_INTERVAL_OPTIONS = ['15m', '30m', '60m'] as const;

export const TEXT_FIELD_TYPE_OPTIONS: readonly AtomTextFieldInputType[] = [
  'text',
  'email',
  'password',
  'url',
];

export const TEXT_FIELD_MAXLENGTH_OPTIONS = ['off', '32', '64'] as const;

export const TEXT_AREA_MAXLENGTH_OPTIONS = ['120', '280', '500'] as const;

export const COUNTER_MODE_OPTIONS = ['char', 'word'] as const;

export const COUNTER_SUFFIX_OPTIONS = ['characters', 'chars', 'words'] as const;

export const DATE_PICKER_MODE_OPTIONS = ['single', 'range'] as const;

export const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];

export const TIMEZONE_OPTIONS: SelectOption[] = [
  { value: 'utc', label: 'UTC' },
  { value: 'cet', label: 'Central European Time' },
  { value: 'est', label: 'Eastern Standard Time' },
  { value: 'pst', label: 'Pacific Standard Time' },
];

export const WORKSPACE_OPTIONS: SelectOption[] = [
  { value: 'design', label: 'Design system' },
  { value: 'platform', label: 'Platform' },
  { value: 'mobile', label: 'Mobile apps' },
];
