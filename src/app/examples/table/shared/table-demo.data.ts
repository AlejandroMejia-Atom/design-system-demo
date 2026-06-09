export interface DemoRow {
  name: string;
  status: string;
  amount: number;
  disabled?: boolean;
}

export interface WideRow {
  id: number;
  name: string;
  department: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  notes: string;
  status: string;
  actions: string;
}

export const DEMO_DATA: DemoRow[] = Array.from({ length: 23 }, (_, index) => ({
  name: `Item ${index + 1}`,
  status: index % 2 === 0 ? 'Active' : 'Pending',
  amount: (index + 1) * 100,
}));

export const WIDE_DATA: WideRow[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: `Employee ${index + 1}`,
  department: ['Engineering', 'Design', 'Sales', 'Support'][index % 4],
  email: `user${index + 1}@example.com`,
  phone: `+1 555 010${String(index).padStart(2, '0')}`,
  city: ['Austin', 'Berlin', 'Tokyo', 'Madrid'][index % 4],
  country: ['USA', 'Germany', 'Japan', 'Spain'][index % 4],
  notes: `Additional context for row ${index + 1} with extra detail for horizontal scrolling.`,
  status: index % 2 === 0 ? 'Active' : 'Pending',
  actions: 'Edit',
}));

export const STANDARD_COLUMNS = ['name', 'status', 'amount'] as const;

export const WIDE_DISPLAYED_COLUMNS = [
  'id',
  'name',
  'department',
  'email',
  'phone',
  'city',
  'country',
  'notes',
  'status',
  'actions',
] as const;

export const ATOM_SELECT_COLUMN = 'atom-select';

export function prependSelectionColumn(columns: readonly string[]): string[] {
  return [
    ATOM_SELECT_COLUMN,
    ...columns.filter((column) => column !== ATOM_SELECT_COLUMN),
  ];
}

export function selectableDemoRows(): DemoRow[] {
  return DEMO_DATA.slice(0, 8).map((row, index) => ({
    ...row,
    disabled: index === 2 || index === 5,
  }));
}

export function checkboxDemoRows(): DemoRow[] {
  return DEMO_DATA.slice(0, 8).map((row, index) => ({
    ...row,
    disabled: index === 2,
  }));
}
