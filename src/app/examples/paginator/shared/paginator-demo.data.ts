export interface PaginatorDemoItem {
  id: number;
  label: string;
  status: string;
}

export const PAGINATOR_DEMO_ITEMS: PaginatorDemoItem[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  label: `Record ${index + 1}`,
  status: index % 2 === 0 ? 'Active' : 'Pending',
}));

export const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 25] as const;
