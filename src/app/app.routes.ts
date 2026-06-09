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
        title: 'Atom Paginator Playground',
      },
      {
        path: 'examples/first-page',
        loadComponent: () =>
          import('./examples/paginator/paginator-state-example.component').then(
            (m) => m.PaginatorStateExampleComponent,
          ),
        data: { exampleId: 'first-page' },
        title: 'First page',
      },
      {
        path: 'examples/middle-page',
        loadComponent: () =>
          import('./examples/paginator/paginator-state-example.component').then(
            (m) => m.PaginatorStateExampleComponent,
          ),
        data: { exampleId: 'middle-page' },
        title: 'Middle page',
      },
      {
        path: 'examples/last-page',
        loadComponent: () =>
          import('./examples/paginator/paginator-state-example.component').then(
            (m) => m.PaginatorStateExampleComponent,
          ),
        data: { exampleId: 'last-page' },
        title: 'Last page',
      },
      {
        path: 'examples/single-page',
        loadComponent: () =>
          import('./examples/paginator/paginator-state-example.component').then(
            (m) => m.PaginatorStateExampleComponent,
          ),
        data: { exampleId: 'single-page' },
        title: 'Single page',
      },
      {
        path: 'examples/empty-dataset',
        loadComponent: () =>
          import('./examples/paginator/paginator-state-example.component').then(
            (m) => m.PaginatorStateExampleComponent,
          ),
        data: { exampleId: 'empty-dataset' },
        title: 'Empty dataset',
      },
      {
        path: 'examples/i18n-spanish',
        loadComponent: () =>
          import('./examples/paginator/i18n-spanish-example.component').then(
            (m) => m.I18nSpanishExampleComponent,
          ),
        title: 'Custom labels (Spanish)',
      },
      {
        path: 'examples/i18n-item-range',
        loadComponent: () =>
          import('./examples/paginator/i18n-item-range-example.component').then(
            (m) => m.I18nItemRangeExampleComponent,
          ),
        title: 'Custom page-info (item range)',
      },
      {
        path: 'examples/data-source',
        loadComponent: () =>
          import('./examples/paginator/data-source-example.component').then(
            (m) => m.DataSourceExampleComponent,
          ),
        title: 'Client-side data source',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
