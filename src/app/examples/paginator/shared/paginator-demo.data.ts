export interface PaginatorTableRow {
  name: string;
  status: string;
  amount: number;
}

export const PAGINATOR_TABLE_DATA: PaginatorTableRow[] = Array.from({ length: 23 }, (_, index) => ({
  name: `Item ${index + 1}`,
  status: index % 2 === 0 ? 'Active' : 'Pending',
  amount: (index + 1) * 100,
}));

export const PAGINATOR_TABLE_COLUMNS = ['name', 'status', 'amount'] as const;

export const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 25] as const;
