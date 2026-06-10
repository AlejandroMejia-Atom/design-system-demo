import type { AtomTableColumn } from '@atomchat-io/ui-design-system';

export interface ProductRow {
  id: number;
  name: string;
  amount: number;
  date: Date;
  active: boolean;
}

export interface UserRow {
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export const PRODUCT_DATA: ProductRow[] = [
  { id: 1, name: 'Product A', amount: 150.5, date: new Date(2023, 0, 15), active: true },
  { id: 2, name: 'Product B', amount: 2500, date: new Date(2023, 1, 20), active: false },
  { id: 3, name: 'Product C', amount: 45.99, date: new Date(2023, 2, 5), active: true },
  { id: 4, name: 'Product D', amount: 1234.56, date: new Date(2023, 3, 10), active: true },
  { id: 5, name: 'Product E', amount: 899, date: new Date(2023, 4, 1), active: false },
];

export const USER_DATA: UserRow[] = Array.from({ length: 23 }, (_, index) => ({
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: ['Admin', 'Editor', 'Viewer'][index % 3],
  status: index % 3 === 0 ? 'Inactive' : 'Active',
  createdAt: `2025-01-${String((index % 28) + 1).padStart(2, '0')}`,
}));

export const STICKY_DEMO_DATA: ProductRow[] = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: `SKU-${1000 + index}`,
  amount: (index + 1) * 125.5,
  date: new Date(2024, index % 12, (index % 27) + 1),
  active: index % 2 === 0,
}));

export const trackProductBy = (_: number, row: ProductRow) => row.id;
export const trackUserBy = (_: number, row: UserRow) => row.email;

export const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 25] as const;

export const BASIC_COLUMNS: AtomTableColumn<ProductRow>[] = [
  { columnName: 'id', columnLabel: 'ID', accessor: 'id', columnType: 'number', width: '4rem' },
  { columnName: 'name', columnLabel: 'Name', accessor: 'name', sortable: true },
  { columnName: 'amount', columnLabel: 'Amount', accessor: 'amount', columnType: 'currency' },
  { columnName: 'status', columnLabel: 'Status', accessor: (row) => (row.active ? 'Active' : 'Inactive') },
];

export const COLUMN_TYPE_COLUMNS: AtomTableColumn<ProductRow>[] = [
  { columnName: 'id', columnLabel: 'ID', accessor: 'id', columnType: 'number', width: '4rem' },
  {
    columnName: 'name',
    columnLabel: 'Name',
    accessor: 'name',
    sortable: true,
    defaultSort: 'asc',
  },
  {
    columnName: 'amount',
    columnLabel: 'Price',
    accessor: 'amount',
    columnType: 'currency',
    sortable: true,
  },
  { columnName: 'active', columnLabel: 'Active', accessor: 'active' },
  { columnName: 'date', columnLabel: 'Created At', accessor: 'date', columnType: 'date' },
];

export const SORT_COLUMNS: AtomTableColumn<ProductRow>[] = [
  { columnName: 'name', columnLabel: 'Name', accessor: 'name', sortable: true, defaultSort: 'asc' },
  { columnName: 'amount', columnLabel: 'Amount', accessor: 'amount', columnType: 'currency', sortable: true },
  { columnName: 'date', columnLabel: 'Date', accessor: 'date', columnType: 'date', sortable: true },
];

export const USER_COLUMNS: AtomTableColumn<UserRow>[] = [
  { columnName: 'name', columnLabel: 'Name', accessor: 'name', sortable: true, defaultSort: 'asc' },
  { columnName: 'email', columnLabel: 'Email', accessor: 'email' },
  { columnName: 'role', columnLabel: 'Role', accessor: 'role', sortable: true },
  { columnName: 'status', columnLabel: 'Status', accessor: 'status' },
  { columnName: 'createdAt', columnLabel: 'Created', accessor: 'createdAt', sortable: true },
];

export const STICKY_COLUMNS: AtomTableColumn<ProductRow>[] = [
  { columnName: 'id', columnLabel: 'ID', accessor: 'id', columnType: 'number', sticky: true, width: '5rem' },
  { columnName: 'name', columnLabel: 'Name', accessor: 'name', width: '12rem' },
  { columnName: 'amount', columnLabel: 'Amount', accessor: 'amount', columnType: 'currency', width: '8rem' },
  { columnName: 'date', columnLabel: 'Date', accessor: 'date', columnType: 'date', width: '10rem' },
  {
    columnName: 'status',
    columnLabel: 'Status',
    accessor: (row) => (row.active ? 'Active' : 'Inactive'),
    stickyEnd: true,
    width: '7rem',
  },
];
