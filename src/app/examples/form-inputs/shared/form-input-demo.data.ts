import type { AtomFormFieldSize } from '@atomchat-io/ui-design-system';

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

export const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];
