export interface DemoExampleMeta {
  id: string;
  title: string;
  description: string;
  route: string;
  checklist?: string[];
}

export interface DemoExampleGroup {
  label: string;
  examples: DemoExampleMeta[];
}

export const DEMO_APP = {
  title: 'Atom Design System Demo',
  brand: 'Atom DS Demo',
  documentTitle: 'Atom Design System Demo',
  themeStorageKey: 'atom-ds-demo-theme',
  tagline:
    'Interactive examples for @atomchat-io/ui-design-system components.',
} as const;

/** Register example groups here when building a component demo. */
export const EXAMPLE_GROUPS: DemoExampleGroup[] = [];

export const ALL_EXAMPLES: DemoExampleMeta[] = EXAMPLE_GROUPS.flatMap(
  (group) => group.examples,
);
