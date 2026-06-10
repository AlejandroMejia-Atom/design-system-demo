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
        title: 'Atom Table Builder Playground',
      },
      {
        path: 'examples/basic',
        loadComponent: () =>
          import('./examples/table-builder/basic/basic-example.component').then(
            (m) => m.BasicExampleComponent,
          ),
        title: 'Basic Table Builder',
      },
      {
        path: 'examples/column-types',
        loadComponent: () =>
          import('./examples/table-builder/column-types/column-types-example.component').then(
            (m) => m.ColumnTypesExampleComponent,
          ),
        title: 'Column Types',
      },
      {
        path: 'examples/sorting',
        loadComponent: () =>
          import('./examples/table-builder/sorting/sorting-example.component').then(
            (m) => m.SortingExampleComponent,
          ),
        title: 'Sorting',
      },
      {
        path: 'examples/pagination',
        loadComponent: () =>
          import('./examples/table-builder/pagination/pagination-example.component').then(
            (m) => m.PaginationExampleComponent,
          ),
        title: 'Pagination',
      },
      {
        path: 'examples/selection-multiple',
        loadComponent: () =>
          import('./examples/table-builder/selection-multiple/selection-multiple-example.component').then(
            (m) => m.SelectionMultipleExampleComponent,
          ),
        title: 'Multiple Selection',
      },
      {
        path: 'examples/selection-single',
        loadComponent: () =>
          import('./examples/table-builder/selection-single/selection-single-example.component').then(
            (m) => m.SelectionSingleExampleComponent,
          ),
        title: 'Single Selection',
      },
      {
        path: 'examples/max-selection',
        loadComponent: () =>
          import('./examples/table-builder/max-selection/max-selection-example.component').then(
            (m) => m.MaxSelectionExampleComponent,
          ),
        title: 'Max Selection',
      },
      {
        path: 'examples/custom-template',
        loadComponent: () =>
          import('./examples/table-builder/custom-template/custom-template-example.component').then(
            (m) => m.CustomTemplateExampleComponent,
          ),
        title: 'Custom Cell Template',
      },
      {
        path: 'examples/sticky-columns',
        loadComponent: () =>
          import('./examples/table-builder/sticky-columns/sticky-columns-example.component').then(
            (m) => m.StickyColumnsExampleComponent,
          ),
        title: 'Sticky Columns',
      },
      {
        path: 'examples/empty-state',
        loadComponent: () =>
          import('./examples/table-builder/empty-state/empty-state-example.component').then(
            (m) => m.EmptyStateExampleComponent,
          ),
        title: 'Empty State',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
