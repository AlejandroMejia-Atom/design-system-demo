import { AtomTableDataSource } from '@atomchat-io/ui-design-system';

export interface LayoutStateDemoRow {
  name: string;
  email: string;
}

export const LAYOUT_STATE_DEMO_COLUMNS = ['name', 'email'] as const;

export const trackLayoutStateRow = (_: number, row: LayoutStateDemoRow) => row.email;

export const layoutStateEmptyDataSource = new AtomTableDataSource<LayoutStateDemoRow>([]);
