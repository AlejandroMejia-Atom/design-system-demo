import type { AtomTableColumn } from '@atomchat-io/ui-design-system';

export interface UserRow {
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export const USER_TABLE_DATA: UserRow[] = Array.from({ length: 24 }, (_, index) => ({
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: ['Admin', 'Editor', 'Viewer'][index % 3],
  status: index % 3 === 0 ? 'Inactive' : 'Active',
  createdAt: `2025-01-${String((index % 28) + 1).padStart(2, '0')}`,
}));

export const USER_TABLE_COLUMNS = ['name', 'email', 'role', 'status', 'createdAt'] as const;

export const trackUserByEmail = (_: number, row: UserRow) => row.email;

export const ROLE_FILTER_ITEMS = ['Admin', 'Editor', 'Viewer'].map((role) => ({
  label: role,
  value: role,
}));

export const STATUS_FILTER_ITEMS = ['Active', 'Inactive'].map((status) => ({
  label: status,
  value: status,
}));

export const BUILDER_COLUMNS: AtomTableColumn<UserRow>[] = [
  { columnName: 'name', columnLabel: 'Name', accessor: 'name', sortable: true, defaultSort: 'asc' },
  { columnName: 'email', columnLabel: 'Email', accessor: 'email' },
  { columnName: 'role', columnLabel: 'Role', accessor: 'role', sortable: true },
  { columnName: 'status', columnLabel: 'Status', accessor: 'status' },
  { columnName: 'createdAt', columnLabel: 'Created', accessor: 'createdAt', sortable: true },
];
