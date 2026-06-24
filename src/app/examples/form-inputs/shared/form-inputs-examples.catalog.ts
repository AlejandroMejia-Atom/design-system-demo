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
          'Visual playground for atom-text-field without atom-form-field. See FormControl for reactive binding and status readout.',
        route: '/examples/form-inputs/text-field',
        checklist: [
          'Switch type (text / email / password / url) and size from the toolbar',
          'Toggle leading @ and trailing .com enhancers',
          'Active API readout reflects the current binding',
          'Toggle Disabled to preview the disabled shell',
        ],
      },
      {
        id: 'search-input',
        title: 'Search input',
        description:
          'atom-search-input composes atom-text-field with search icon, clear button, and optional expandable mode.',
        route: '/examples/form-inputs/search-input',
        checklist: [
          'Switch debounce (0 / 200 / 400 / 800 ms) and watch the (search) event',
          'Toggle Expandable to compare collapsed vs expanded modes',
          'Switch sizes with atom-segment-control (s / m / l)',
          'Active API readout shows the current prop bindings',
        ],
      },
      {
        id: 'text-area',
        title: 'Text area',
        description:
          'Multi-line input via textarea atomTextFieldInput inside atom-text-field — no form-field wrapper.',
        route: '/examples/form-inputs/text-area',
        checklist: [
          'Switch maxlength and counterMode (char / word) from the toolbar',
          'Switch sizes with atom-segment-control (m / xl)',
          'Character counter updates as you type',
          'Active API readout reflects the current binding',
        ],
      },
      {
        id: 'select-input',
        title: 'Select input',
        description:
          'atom-select-input with atom-list-item options — single select, searchable, without atom-form-field.',
        route: '/examples/form-inputs/select-input',
        checklist: [
          'Toggle searchable, multiple, grouped, loading, and hideClearFooter',
          'Switch sizes with atom-segment-control (xs / s / m / l / xl)',
          'Multiple mode switches the FormControl value to string[]',
          'Active API readout shows all current prop bindings',
        ],
      },
      {
        id: 'date-picker',
        title: 'Date picker',
        description: 'atom-date-picker as a standalone control — calendar panel, mask input, no form-field wrapper.',
        route: '/examples/form-inputs/date-picker',
        checklist: [
          'Switch mode between single date and date range pickers',
          'Toggle doubleCalendar in range mode',
          'Bounds readout shows min/max — one calendar month before and after today',
          'Toggle min/max bounds off to allow any date',
        ],
      },
      {
        id: 'time-picker',
        title: 'Time picker',
        description: 'atom-time-picker as a standalone control — preset intervals and 12h/24h formats.',
        route: '/examples/form-inputs/time-picker',
        checklist: [
          'Switch timeFormat (12h / 24h) and interval (15m / 30m / 60m)',
          'Toggle office-hours min/max bounds',
          'Switch sizes with atom-segment-control (xs / s / m / l / xl)',
          'Active API readout reflects the current binding',
        ],
      },
    ],
  },
  {
    label: 'Reactive forms (FormControl)',
    examples: [
      {
        id: 'form-control',
        title: 'FormControl binding',
        description:
          'All input types bound with [formControl] — validators, value sync, and a shared status readout. Component APIs are explored in the standalone playgrounds.',
        route: '/examples/form-inputs/form-control',
        checklist: [
          'Each control uses [formControl] with its own validators',
          'Switch the inspect segment to read status for search, email, bio, language, date, or time',
          'Mark touched / Mark dirty / Reset / Patch sample on the active FormControl',
          'Compare with FormGroup for formControlName and with standalone pages for component APIs',
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
