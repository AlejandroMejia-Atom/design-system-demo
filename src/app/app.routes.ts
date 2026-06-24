import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AppShellComponent } from './shell/app-shell.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Atom Table Playground',
      },
      {
        path: 'examples/full-table/manual',
        loadComponent: () =>
          import('./examples/full-table/manual/full-table-manual-example.component').then(
            (m) => m.FullTableManualExampleComponent,
          ),
        title: 'Full Table — Manual',
      },
      {
        path: 'examples/full-table/builder',
        loadComponent: () =>
          import('./examples/full-table/builder/full-table-builder-example.component').then(
            (m) => m.FullTableBuilderExampleComponent,
          ),
        title: 'Full Table — Builder',
      },
      {
        path: 'examples/full-table/empty-state-template',
        loadComponent: () =>
          import('./examples/full-table/empty-state-template/empty-state-template-example.component').then(
            (m) => m.EmptyStateTemplateExampleComponent,
          ),
        title: 'Empty State — Templates',
      },
      {
        path: 'examples/full-table/empty-state-intl',
        loadComponent: () =>
          import('./examples/full-table/empty-state-intl/empty-state-intl-example.component').then(
            (m) => m.EmptyStateIntlExampleComponent,
          ),
        title: 'Empty State — Intl',
      },
      {
        path: 'examples/basic',
        loadComponent: () =>
          import('./examples/table/basic/basic-example.component').then(
            (m) => m.BasicExampleComponent,
          ),
        title: 'Basic Table',
      },
      {
        path: 'examples/sort',
        loadComponent: () =>
          import('./examples/table/sort/sort-example.component').then(
            (m) => m.SortExampleComponent,
          ),
        title: 'Sortable Table',
      },
      {
        path: 'examples/pagination',
        loadComponent: () =>
          import('./examples/table/pagination/pagination-example.component').then(
            (m) => m.PaginationExampleComponent,
          ),
        title: 'Paginated Table',
      },
      {
        path: 'examples/sticky-columns',
        loadComponent: () =>
          import('./examples/table/sticky-columns/sticky-columns-example.component').then(
            (m) => m.StickyColumnsExampleComponent,
          ),
        title: 'Sticky Columns',
      },
      {
        path: 'examples/selectable',
        loadComponent: () =>
          import('./examples/table/selectable/selectable-example.component').then(
            (m) => m.SelectableExampleComponent,
          ),
        title: 'Selectable Rows',
      },
      {
        path: 'examples/checkboxes',
        loadComponent: () =>
          import('./examples/table/checkboxes/checkboxes-example.component').then(
            (m) => m.CheckboxesExampleComponent,
          ),
        title: 'Selection Checkboxes',
      },
      {
        path: 'examples/single-selection',
        loadComponent: () =>
          import('./examples/table/single-selection/single-selection-example.component').then(
            (m) => m.SingleSelectionExampleComponent,
          ),
        title: 'Single Selection',
      },
      {
        path: 'examples/empty-state',
        loadComponent: () =>
          import('./examples/table/empty-state/empty-state-example.component').then(
            (m) => m.EmptyStateExampleComponent,
          ),
        title: 'Empty State',
      },
      {
        path: 'examples/cell-patterns',
        loadComponent: () =>
          import('./examples/table/cell-patterns/cell-patterns-example.component').then(
            (m) => m.CellPatternsExampleComponent,
          ),
        title: 'Cell Patterns',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
