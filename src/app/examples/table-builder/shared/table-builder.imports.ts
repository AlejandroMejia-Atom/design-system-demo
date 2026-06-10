import {
  AtomTableAlignPipe,
  AtomTableBuilderComponent,
  AtomTableCellRenderPipe,
  AtomTableCellValuePipe,
} from '@atomchat-io/ui-design-system';

/** Same surface as ATOM_TABLE_BUILDER_IMPORTS — explicit imports for Vite/StackBlitz prebundling. */
export const TABLE_BUILDER_DEMO_IMPORTS = [
  AtomTableBuilderComponent,
  AtomTableCellRenderPipe,
  AtomTableAlignPipe,
  AtomTableCellValuePipe,
] as const;
