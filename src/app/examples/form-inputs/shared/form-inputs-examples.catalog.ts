export function formInputExampleById(id: string) {
  const example = ALL_FORM_INPUT_EXAMPLES.find((e) => e.id === id);
  if (!example) {
    throw new Error(`Unknown form input example: ${id}`);
  }
  return example;
}

export interface FormInputExampleMeta {
  id: string;
  title: string;
  description: string;
  route: string;
  checklist: string[];
}

export interface FormInputExampleGroup {
  label: string;
  examples: FormInputExampleMeta[];
}

export const FORM_INPUT_EXAMPLE_GROUPS: FormInputExampleGroup[] = [
  {
    label: 'Standalone controls',
    examples: [
      {
        id: 'text-field',
        title: 'Text field',
        description:
          'Visual playground for atom-text-field without atom-form-field. See Text field + FormControl for validators and status readout.',
        route: '/examples/form-inputs/text-field',
        checklist: [
          'Type in the email field — border and focus ring follow DS states',
          'Switch sizes with atom-segment-control (xs / s / m / l / xl)',
          'Leading @ and trailing .com enhancers render inside the field shell',
          'Toggle Disabled with atom-toggle to preview the disabled shell',
        ],
      },
      {
        id: 'search-input',
        title: 'Search input',
        description:
          'atom-search-input composes atom-text-field with search icon, clear button, and optional expandable mode.',
        route: '/examples/form-inputs/search-input',
        checklist: [
          'Default mode shows search icon, input, and clear button when filled',
          'Switch sizes with atom-segment-control (s / m / l)',
          'Toggle Expandable and Disabled with atom-toggle',
        ],
      },
      {
        id: 'text-area',
        title: 'Text area',
        description:
          'Multi-line input via textarea atomTextFieldInput inside atom-text-field — no form-field wrapper.',
        route: '/examples/form-inputs/text-area',
        checklist: [
          'Textarea auto-resizes as you type (within row limits)',
          'Character counter appears when maxlength is set on the textarea',
          'Switch sizes with atom-segment-control (m / xl)',
        ],
      },
      {
        id: 'select-input',
        title: 'Select input',
        description:
          'atom-select-input with atom-list-item options — single select, searchable, without atom-form-field.',
        route: '/examples/form-inputs/select-input',
        checklist: [
          'Open the panel and pick a language',
          'Switch sizes with atom-segment-control (xs / s / m / l / xl)',
          'Search filters options when searchable is enabled',
          'Selected value displays in the trigger',
          'Clear resets the selection',
        ],
      },
      {
        id: 'date-picker',
        title: 'Date picker',
        description: 'atom-date-picker as a standalone control — calendar panel, mask input, no form-field wrapper.',
        route: '/examples/form-inputs/date-picker',
        checklist: [
          'Click the calendar icon or type a date in the masked input',
          'Switch sizes with atom-segment-control (xs / s / m / l / xl)',
          'Calendar panel opens with Apply / Cancel actions',
          'Min/max bounds constrain selectable dates',
        ],
      },
      {
        id: 'time-picker',
        title: 'Time picker',
        description: 'atom-time-picker as a standalone control — preset intervals and 12h/24h formats.',
        route: '/examples/form-inputs/time-picker',
        checklist: [
          'Open the panel and pick a preset time',
          'Switch sizes with atom-segment-control (xs / s / m / l / xl)',
          'Switch between 12h and 24h formats with atom-segment-control',
        ],
      },
    ],
  },
  {
    label: 'Reactive forms (FormControl)',
    examples: [
      {
        id: 'text-field-form-control',
        title: 'Text field + FormControl',
        description:
          'Reactive FormControl on atomTextFieldInput inside atom-form-field — required, pattern validators, and live control status.',
        route: '/examples/form-inputs/text-field-form-control',
        checklist: [
          'Clear the field and click Mark touched — error message appears',
          'Patch sample sets a valid username on the FormControl',
          'Readout shows value, status, touched/dirty, and validation errors',
        ],
      },
      {
        id: 'search-input-form-control',
        title: 'Search input + FormControl',
        description:
          'atom-search-input bound with [formControl] and minLength validation — no atom-form-field wrapper.',
        route: '/examples/form-inputs/search-input-form-control',
        checklist: [
          'Type fewer than 3 characters — FormControl stays invalid',
          'Debounced value still syncs to the bound FormControl',
          'Reset clears both the input and validation state',
        ],
      },
      {
        id: 'text-area-form-control',
        title: 'Text area + FormControl',
        description:
          'Textarea with [formControl], maxlength, and minLength validators composed with atom-form-field counter.',
        route: '/examples/form-inputs/text-area-form-control',
        checklist: [
          'Character counter tracks FormControl value length',
          'Mark touched with empty value surfaces required error',
          'Patch sample fills a valid release note',
        ],
      },
      {
        id: 'select-input-form-control',
        title: 'Select input + FormControl',
        description:
          'atom-select-input as a ControlValueAccessor — [formControl] with required validator and label resolution in readout.',
        route: '/examples/form-inputs/select-input-form-control',
        checklist: [
          'Open panel and pick a language — FormControl value updates',
          'Clear selection and mark touched — required error shows',
          'Readout resolves the locale code to a human label',
        ],
      },
      {
        id: 'date-picker-form-control',
        title: 'Date picker + FormControl',
        description:
          'atom-date-picker with [formControl] — Date | null value, required validator, and min/max bounds.',
        route: '/examples/form-inputs/date-picker-form-control',
        checklist: [
          'Pick a date from the calendar — FormControl commits Date | null',
          'Type an out-of-range date — parse/min/max errors on the control',
          'Patch sample sets a date two weeks from today',
        ],
      },
      {
        id: 'time-picker-form-control',
        title: 'Time picker + FormControl',
        description:
          'atom-time-picker with [formControl] — preset and typed commits sync to a Date | null FormControl.',
        route: '/examples/form-inputs/time-picker-form-control',
        checklist: [
          'Pick a preset — FormControl updates on commit',
          'Type a time outside office hours — min/max validation fails',
          'Readout formats the time portion of the stored Date',
        ],
      },
    ],
  },
  {
    label: 'FormGroup',
    examples: [
      {
        id: 'form-group',
        title: 'FormGroup composition',
        description:
          'Multiple controls wired with formControlName on a shared FormGroup — patchValue, disable/enable, and live JSON snapshot.',
        route: '/examples/form-inputs/form-group',
        checklist: [
          'Patch sample fills every control via form.patchValue',
          'Disable form toggles disabled state on all FormControls',
          'JSON block reflects raw values, formatted dates, and form status',
          'Mark all touched surfaces field-level validation together',
        ],
      },
    ],
  },
  {
    label: 'Form field',
    examples: [
      {
        id: 'form-field',
        title: 'Full form',
        description:
          'All controls composed with atom-form-field — labels, support text, validation, and counters. Search sits in the toolbar slot (not an AtomFormFieldControl).',
        route: '/examples/form-inputs/form-field',
        checklist: [
          'Search input in the demo toolbar (standalone pattern from data-layout)',
          'Email text field shows support text when pristine',
          'Bio textarea shows character counter',
          'Language select shows error when touched and empty',
          'Date and time pickers integrate with reactive FormControls',
          'Submit marks all fields touched to surface validation',
        ],
      },
    ],
  },
];

export const ALL_FORM_INPUT_EXAMPLES = FORM_INPUT_EXAMPLE_GROUPS.flatMap(
  (group) => group.examples,
);
